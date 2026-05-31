# ================================================================
# Budget Exporter - Build Script (Firefox / Chrome / Edge)
# Creates ready-to-install packages (.xpi for Firefox, .zip for Chromium)
# ================================================================

param(
    [ValidateSet('firefox','chrome','edge','all')]
    [string]$Target = 'firefox'
)

Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Budget Exporter - Build Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# ----------------- Configuration -----------------
$sourceDir = (Get-Location).Path
$outputDir = Join-Path $sourceDir "dist"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

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

function New-UniqueTempDir([string]$baseName) {
    $candidate = Join-Path $env:TEMP ("{0}-{1}-{2}" -f $baseName, $PID, (Get-Date -Format "yyyyMMdd-HHmmssfff"))
    if (Test-Path $candidate) {
        Remove-Item $candidate -Recurse -Force
    }
    New-Item -ItemType Directory -Path $candidate | Out-Null
    return $candidate
}

function Resolve-ArchivePath([string]$outputDir, [string]$preferredName, [string]$timestamp) {
    $preferredPath = Join-Path $outputDir $preferredName

    if (-not (Test-Path $preferredPath)) {
        return @{ Path = $preferredPath; Name = $preferredName; UsedFallback = $false }
    }

    try {
        Remove-Item -LiteralPath $preferredPath -Force -ErrorAction Stop
        return @{ Path = $preferredPath; Name = $preferredName; UsedFallback = $false }
    } catch {
        $baseName = [System.IO.Path]::GetFileNameWithoutExtension($preferredName)
        $extension = [System.IO.Path]::GetExtension($preferredName)
        $fallbackName = "$baseName-$timestamp$extension"
        $fallbackPath = Join-Path $outputDir $fallbackName
        return @{ Path = $fallbackPath; Name = $fallbackName; UsedFallback = $true }
    }
}

# ----------------- Read version from source manifest -----------------
# manifest.json is the Firefox variant AND the canonical source of the version.
# manifest.chrome.json is the override used only for Chrome/Edge builds.
$manifestSourcePath = Join-Path $sourceDir "manifest.json"
if (-not (Test-Path $manifestSourcePath)) {
    Write-Host "ERROR: manifest.json not found in source directory!" -ForegroundColor Red
    exit 1
}

$manifestContent = Get-Content $manifestSourcePath -Raw | ConvertFrom-Json
$pkgVersion = $manifestContent.version

if ([string]::IsNullOrWhiteSpace($pkgVersion)) {
    Write-Host "WARNING: Version not found in manifest.json. Using timestamp: $timestamp" -ForegroundColor Yellow
    $pkgVersion = $timestamp
} else {
    Write-Host "Version from manifest.json: $pkgVersion" -ForegroundColor Green
}

# ----------------- Prepare output directory -----------------
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "Created 'dist' directory" -ForegroundColor Yellow
}

# ----------------- Exclusion rules -----------------
$filesToExclude = @(
    "*.md","*.txt",".git*","node_modules",".DS_Store","Thumbs.db","*.log","*.tmp","dist","*.ps1",".idea*", "dist*", "node_modules*",
    "manifest.chrome.json",
    "src", "src*",
    "package.json", "package-lock.json",
    "build.config.mjs",
    ".gitignore",
    ".claude", ".claude*",
    ".vscode", ".vscode*"
)

# ----------------- Frontend bundle -----------------
Write-Host ""
Write-Host "------------------------------------------------" -ForegroundColor Cyan
Write-Host "  Building sidebar bundle (esbuild)" -ForegroundColor Cyan
Write-Host "------------------------------------------------" -ForegroundColor Cyan

$nodeModulesDir = Join-Path $sourceDir "node_modules"
if (-not (Test-Path $nodeModulesDir)) {
    Write-Host "node_modules not found, running 'npm ci'..." -ForegroundColor Yellow
    & npm ci
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: 'npm ci' failed." -ForegroundColor Red
        exit 1
    }
}

& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: 'npm run build' failed." -ForegroundColor Red
    exit 1
}

$bundleJs = Join-Path $sourceDir "sidebar.bundle.js"
$bundleCss = Join-Path $sourceDir "sidebar.bundle.css"
if (-not (Test-Path $bundleJs) -or -not (Test-Path $bundleCss)) {
    Write-Host "ERROR: sidebar bundle files were not produced." -ForegroundColor Red
    exit 1
}
Write-Host "Sidebar bundle ready." -ForegroundColor Green

function New-Package {
    param(
        [Parameter(Mandatory=$true)][string]$TargetName,
        [Parameter(Mandatory=$true)][string]$PkgVersion,
        [Parameter(Mandatory=$true)][string]$SourceDir,
        [Parameter(Mandatory=$true)][string]$OutputDir,
        [Parameter(Mandatory=$true)][string]$Timestamp,
        [Parameter(Mandatory=$true)][string[]]$FilesToExclude
    )

    # Extension + source manifest per target
    switch ($TargetName) {
        'firefox' { $archiveExt = 'xpi'; $manifestSrc = 'manifest.json'         }
        'chrome'  { $archiveExt = 'zip'; $manifestSrc = 'manifest.chrome.json'  }
        'edge'    { $archiveExt = 'zip'; $manifestSrc = 'manifest.chrome.json'  }
    }

    $manifestSourcePath = Join-Path $SourceDir $manifestSrc
    if (-not (Test-Path $manifestSourcePath)) {
        Write-Host "ERROR: $manifestSrc not found for target '$TargetName'" -ForegroundColor Red
        return
    }

    Write-Host ""
    Write-Host "------------------------------------------------" -ForegroundColor Cyan
    Write-Host "  Building target: $TargetName ($manifestSrc)" -ForegroundColor Cyan
    Write-Host "------------------------------------------------" -ForegroundColor Cyan

    $zipName = "budget-exporter-v$PkgVersion-$TargetName.$archiveExt"
    $archiveInfo = Resolve-ArchivePath -outputDir $OutputDir -preferredName $zipName -timestamp $Timestamp
    $zipName = $archiveInfo.Name
    $zipPath = $archiveInfo.Path
    if ($archiveInfo.UsedFallback) {
        Write-Host "WARNING: Existing archive is locked. Using fallback name: $zipName" -ForegroundColor Yellow
    }

    $tempDir = New-UniqueTempDir "budget-exporter-build-$TargetName"

    Write-Host "Copying source files..." -ForegroundColor Yellow
    $srcRoot = (Resolve-Path $SourceDir).Path
    Get-ChildItem -Path $SourceDir -Recurse -File | ForEach-Object {
        $full = $_.FullName
        $rel  = $full.Substring($srcRoot.Length).TrimStart('\','/').Replace('\', '/')
        if (-not (Should-Exclude $rel $FilesToExclude)) {
            $target    = Join-Path $tempDir $rel.Replace('/', '\')
            $targetDir = Split-Path $target -Parent
            if (-not (Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir | Out-Null }
            Copy-Item -LiteralPath $full -Destination $target -Force
        }
    }

    # Copy the browser-specific manifest into the package as manifest.json
    $manifestTempPath = Join-Path $tempDir "manifest.json"
    Copy-Item -LiteralPath $manifestSourcePath -Destination $manifestTempPath -Force

    # ----- Update manage.html (.version element) -----
    $managePath = (Join-Path $tempDir "manage.html")
    if (Test-Path $managePath) {
        $html = Get-Content $managePath -Raw -Encoding UTF8

        # Replace the inner text of any element that has class="... version ..."
        $pattern = @'
<(?<tag>\w+)(?<attrs>[^>]*\bclass=("|')[^"\']*\bversion\b[^"\']*("|\')[^>]*)>(?<inner>.*?)</\k<tag>\s*>
'@
        $options = [System.Text.RegularExpressions.RegexOptions]::Singleline

        $newHtml = [System.Text.RegularExpressions.Regex]::Replace(
            $html,
            $pattern,
            {
                param($m)
                "<$($m.Groups['tag'].Value)$($m.Groups['attrs'].Value)>$PkgVersion</$($m.Groups['tag'].Value)>"
            },
            $options
        )

        if ($newHtml -ne $html) {
            Set-Content -LiteralPath $managePath -Value $newHtml -Encoding UTF8
            Write-Host "manage.html: version updated -> $PkgVersion" -ForegroundColor Green
        } else {
            Write-Host "WARNING: Could not find an element with class='version' in manage.html" -ForegroundColor Yellow
        }
    } else {
        Write-Host "WARNING: manage.html not found" -ForegroundColor Yellow
    }

    # ----- Ensure manifest version matches -----
    $manifest    = Get-Content $manifestTempPath -Raw | ConvertFrom-Json
    $oldVersion  = $manifest.version
    $manifest.version = $PkgVersion
    $manifest | ConvertTo-Json -Depth 100 | Set-Content -LiteralPath $manifestTempPath -Encoding UTF8
    Write-Host "manifest.json: $oldVersion -> $PkgVersion" -ForegroundColor Green

    # ----- Count and compress -----
    $fileCount = (Get-ChildItem -Path $tempDir -Recurse -File).Count
    Write-Host "Total files (temp): $fileCount" -ForegroundColor Cyan

    Write-Host "Creating archive ($zipName)..." -ForegroundColor Yellow
    try {
        $originalLocation = Get-Location
        Set-Location $tempDir

        $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

        Get-ChildItem -Recurse -File | ForEach-Object {
            $entryName = $_.FullName.Substring($tempDir.Length).TrimStart('\').Replace('\', '/')
            [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $entryName, "Optimal") | Out-Null
        }
        $zip.Dispose()

        Set-Location $originalLocation
        Write-Host "Archive created with POSIX paths!" -ForegroundColor Green
    } catch {
        if ($originalLocation) { Set-Location $originalLocation }
        Write-Host "ERROR while creating archive: $_" -ForegroundColor Red
        Remove-Item $tempDir -Recurse -Force
        return
    }

    # ----- Cleanup temp -----
    Remove-Item $tempDir -Recurse -Force

    # ----- Report -----
    $zipInfo = Get-Item $zipPath
    $sizeKB  = [math]::Round($zipInfo.Length / 1KB, 2)
    $sizeMB  = [math]::Round($zipInfo.Length / 1MB, 2)

    Write-Host ""
    Write-Host "[$TargetName] File:     $zipName" -ForegroundColor Cyan
    Write-Host "[$TargetName] Location: $zipPath" -ForegroundColor Cyan
    Write-Host "[$TargetName] Size:     $sizeKB KB ($sizeMB MB)" -ForegroundColor Cyan

    # ----- Validate -----
    $zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
    $hasManifest = $zip.Entries | Where-Object { $_.Name -eq "manifest.json" }
    $hasIcons    = $zip.Entries | Where-Object { $_.FullName -like "*icons*" }
    $zip.Dispose()

    if ($hasManifest) { Write-Host "[$TargetName] [OK] manifest.json found" -ForegroundColor Green } else { Write-Host "[$TargetName] [ERROR] manifest.json NOT found!" -ForegroundColor Red }
    if ($hasIcons)    { Write-Host "[$TargetName] [OK] Icons found"          -ForegroundColor Green } else { Write-Host "[$TargetName] [WARNING] No icons found" -ForegroundColor Yellow }
}

# ----------------- Dispatch -----------------
$targets = if ($Target -eq 'all') { @('firefox','chrome','edge') } else { @($Target) }

foreach ($t in $targets) {
    New-Package -TargetName $t -PkgVersion $pkgVersion -SourceDir $sourceDir -OutputDir $outputDir -Timestamp $timestamp -FilesToExclude $filesToExclude
}

# ----------------- Final Info -----------------
Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Build completed!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Version: $pkgVersion" -ForegroundColor Cyan
Write-Host ""
Write-Host "Install instructions:" -ForegroundColor Cyan
Write-Host "  Firefox: about:debugging -> This Firefox -> Load Temporary Add-on -> pick .xpi" -ForegroundColor White
Write-Host "  Chrome:  chrome://extensions -> Developer mode -> unzip .zip -> Load unpacked" -ForegroundColor White
Write-Host "  Edge:    edge://extensions -> Developer mode -> unzip .zip -> Load unpacked" -ForegroundColor White
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
