# ================================================================
# Budget Exporter - Build Script (for Mozilla Add-ons)
# Creates a ready-to-upload ZIP package
# ================================================================

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Budget Exporter - Build Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# ----------------- Configuration -----------------
$sourceDir = (Get-Location).Path
$outputDir = Join-Path $sourceDir "dist"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# ----------------- Helpers -----------------
function Get-LatestTag {
    try {
        git -C $sourceDir rev-parse --is-inside-work-tree 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) { return $null }
        $tag = (git -C $sourceDir describe --tags --abbrev=0 2>$null)
        if ([string]::IsNullOrWhiteSpace($tag)) { return $null }
        return $tag.Trim()
    } catch { return $null }
}

function Sanitize-Version([string]$raw) {
    if ([string]::IsNullOrWhiteSpace($raw)) { return $null }
    # Remove common 'v' prefix (v1.2.3 -> 1.2.3)
    $v = $raw -replace '^\s*v',''
    return $v.Trim()
}

function Should-Exclude($relativePath, [string[]]$patterns) {
    foreach ($p in $patterns) {
        if (
        ($relativePath -like $p) -or
        ($relativePath -like ("*/" + $p)) -or   # forward slashes
        ($relativePath -like ('*\' + $p))       # backslashes (use single quotes!)
        ) {
            return $true
        }
    }
    return $false
}

# ----------------- Determine Version (git tag -> fallback timestamp) -----------------
$latestTag  = Get-LatestTag
$pkgVersion = if ($latestTag) { Sanitize-Version $latestTag } else { $timestamp }

if ($latestTag) {
    Write-Host "Latest tag found: $latestTag  -> version: $pkgVersion" -ForegroundColor Green
} else {
    Write-Host "No tags found. Using timestamp as version: $pkgVersion" -ForegroundColor Yellow
}

# ----------------- Prepare output paths -----------------
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "Created 'dist' directory" -ForegroundColor Yellow
}
$zipName = "budget-exporter-v$pkgVersion.xpi"
$zipPath = Join-Path $outputDir $zipName
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

# ----------------- Exclusion rules -----------------
$filesToExclude = @(
    "*.md","*.txt",".git*","node_modules",".DS_Store","Thumbs.db","*.log","*.tmp","dist","*.ps1",".idea*", "dist*", "node_modules*"
)

# ----------------- Temporary directory -----------------
$tempDir = Join-Path $env:TEMP "budget-exporter-build"
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
New-Item -ItemType Directory -Path $tempDir | Out-Null

Write-Host ""
Write-Host "Copying source files..." -ForegroundColor Yellow

# Copy files excluding unwanted patterns (PS 5.1-friendly)
$srcRoot = (Resolve-Path $sourceDir).Path
Get-ChildItem -Path $sourceDir -Recurse -File | ForEach-Object {
    $full = $_.FullName
    # Compute relative path without PS7-only switches
    $rel  = $full.Substring($srcRoot.Length).TrimStart('\','/')
    if (-not (Should-Exclude $rel $filesToExclude)) {
        $target    = Join-Path $tempDir $rel
        $targetDir = Split-Path $target -Parent
        if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir | Out-Null }
        Copy-Item -LiteralPath $full -Destination $target -Force
    }
}

# ----------------- Update manage.html (.version element) -----------------
$managePath = (Join-Path $tempDir "manage.html")

if (Test-Path $managePath) {
$html = Get-Content $managePath -Raw -Encoding UTF8

# Replace the inner text of any element that has class="... version ..."
# Using single-quoted regex so backslashes are literal; \b and backref \k<tag> are preserved.
$pattern = @'
<(?<tag>\w+)(?<attrs>[^>]*\bclass=("|')[^"\']*\bversion\b[^"\']*("|\')[^>]*)>(?<inner>.*?)</\k<tag>\s*>
'@
    $options = [System.Text.RegularExpressions.RegexOptions]::Singleline

    $newHtml = [System.Text.RegularExpressions.Regex]::Replace(
        $html,
        $pattern,
        {
            param($m)
            "<$($m.Groups['tag'].Value)$($m.Groups['attrs'].Value)>$pkgVersion</$($m.Groups['tag'].Value)>"
        },
        $options
    )

    if ($newHtml -ne $html) {
        Set-Content -LiteralPath $managePath -Value $newHtml -Encoding UTF8
        Write-Host "manage.html: version updated -> $pkgVersion" -ForegroundColor Green
    } else {
        Write-Host "WARNING: Could not find an element with class='version' in manage.html" -ForegroundColor Yellow
    }
} else {
    Write-Host "WARNING: manage.html not found" -ForegroundColor Yellow
}

# ----------------- Update manifest.json -----------------
$manifestTempPath = Join-Path $tempDir "manifest.json"
if (-not (Test-Path $manifestTempPath)) {
    Write-Host "ERROR: manifest.json not found in package!" -ForegroundColor Red
    Remove-Item $tempDir -Recurse -Force
    exit 1
}

$manifest    = Get-Content $manifestTempPath -Raw | ConvertFrom-Json
$oldVersion  = $manifest.version
$manifest.version = $pkgVersion
$manifest | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $manifestTempPath -Encoding UTF8
Write-Host "manifest.json: $oldVersion -> $pkgVersion" -ForegroundColor Green

# ----------------- Count and compress -----------------
$fileCount = (Get-ChildItem -Path $tempDir -Recurse -File).Count
Write-Host "Total files (temp): $fileCount" -ForegroundColor Cyan

Write-Host ""
Write-Host "Creating xpi archive ($zipName)..." -ForegroundColor Yellow
try {
    if (Test-Path $zipPath) { Remove-Item $zipPath -Force }
    Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $zipPath -CompressionLevel Optimal -Force
    Write-Host "xpi successfully created!" -ForegroundColor Green
} catch {
    Write-Host "ERROR while creating xpi: $_" -ForegroundColor Red
    Remove-Item $tempDir -Recurse -Force
    exit 1
}

# ----------------- Cleanup -----------------
Remove-Item $tempDir -Recurse -Force

# ----------------- Final Info -----------------
$zipInfo = Get-Item $zipPath
$sizeKB  = [math]::Round($zipInfo.Length / 1KB, 2)
$sizeMB  = [math]::Round($zipInfo.Length / 1MB, 2)

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Build completed successfully!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Version used: $pkgVersion" -ForegroundColor Cyan
Write-Host "File: $zipName" -ForegroundColor Cyan
Write-Host "Location: $zipPath" -ForegroundColor Cyan
Write-Host "Size: $sizeKB KB ($sizeMB MB)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Validating structure..." -ForegroundColor Yellow

Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
$hasManifest = $zip.Entries | Where-Object { $_.Name -eq "manifest.json" }
$hasIcons    = $zip.Entries | Where-Object { $_.FullName -like "icons/*" }
$zip.Dispose()

if ($hasManifest) { Write-Host "[OK] manifest.json found" -ForegroundColor Green } else { Write-Host "[ERROR] manifest.json NOT found!" -ForegroundColor Red }
if ($hasIcons)    { Write-Host "[OK] Icons found"          -ForegroundColor Green } else { Write-Host "[WARNING] No icons found" -ForegroundColor Yellow }

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Test the extension locally (about:debugging)" -ForegroundColor White
Write-Host "2. Go to https://addons.mozilla.org/developers/" -ForegroundColor White
Write-Host "3. Upload the file: $zipName" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to open the output directory..." -ForegroundColor Yellow
$inCi = (($env:CI -and $env:CI.ToString().ToLower() -eq "true") -or $env:GITHUB_ACTIONS -or $env:TF_BUILD -or $env:BUILD_BUILDNUMBER)
if ($inCi) {
    Write-Host "CI environment detected. Skipping pause and Explorer." -ForegroundColor Yellow
} else {
    try {
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        Start-Process explorer.exe -ArgumentList $outputDir
    } catch {
        Write-Host "Non-interactive host detected. Skipping pause and Explorer." -ForegroundColor Yellow
    }
}
