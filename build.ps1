# Script de Build para Budget Exporter - Mozilla Add-ons
# Cria um arquivo ZIP pronto para submissão

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Budget Exporter - Build Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Configurações
$sourceDir = "budget-exporter"
$outputDir = "dist"
$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# Lê a versão do manifest.json
$manifestPath = Join-Path $sourceDir "manifest.json"
if (Test-Path $manifestPath) {
    $manifest = Get-Content $manifestPath -Raw | ConvertFrom-Json
    $version = $manifest.version
    Write-Host "Versão encontrada: $version" -ForegroundColor Green
} else {
    Write-Host "ERRO: manifest.json não encontrado!" -ForegroundColor Red
    exit 1
}

$zipName = "budget-exporter-v$version-$timestamp.zip"
$zipPath = Join-Path $outputDir $zipName

# Cria diretório de saída se não existir
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir | Out-Null
    Write-Host "Diretório 'dist' criado" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Preparando arquivos..." -ForegroundColor Yellow

# Lista de arquivos/pastas a incluir
$filesToInclude = @(
    "manifest.json",
    "*.js",
    "*.html",
    "*.css",
    "icons",
    "content-scripts",
    "*.svg"
)

# Lista de arquivos/pastas a excluir
$filesToExclude = @(
    "*.md",
    "*.txt",
    ".git*",
    "node_modules",
    ".DS_Store",
    "Thumbs.db",
    "*.log",
    "*.tmp"
)

# Remove arquivo ZIP antigo se existir
if (Test-Path $zipPath) {
    Remove-Item $zipPath -Force
}

# Cria arquivo temporário de lista
$tempDir = Join-Path $env:TEMP "budget-exporter-build"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copia arquivos para diretório temporário
Write-Host "Copiando arquivos..." -ForegroundColor Yellow
Copy-Item -Path (Join-Path $sourceDir "*") -Destination $tempDir -Recurse -Exclude $filesToExclude

# Conta arquivos
$fileCount = (Get-ChildItem -Path $tempDir -Recurse -File).Count
Write-Host "Total de arquivos: $fileCount" -ForegroundColor Cyan

# Cria o ZIP
Write-Host ""
Write-Host "Criando arquivo ZIP..." -ForegroundColor Yellow
try {
    Compress-Archive -Path (Join-Path $tempDir "*") -DestinationPath $zipPath -CompressionLevel Optimal -Force
    Write-Host "ZIP criado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "ERRO ao criar ZIP: $_" -ForegroundColor Red
    Remove-Item $tempDir -Recurse -Force
    exit 1
}

# Remove diretório temporário
Remove-Item $tempDir -Recurse -Force

# Informações do arquivo criado
$zipInfo = Get-Item $zipPath
$sizeKB = [math]::Round($zipInfo.Length / 1KB, 2)
$sizeMB = [math]::Round($zipInfo.Length / 1MB, 2)

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Build concluído com sucesso!" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Arquivo: $zipName" -ForegroundColor Cyan
Write-Host "Local: $zipPath" -ForegroundColor Cyan
Write-Host "Tamanho: $sizeKB KB ($sizeMB MB)" -ForegroundColor Cyan
Write-Host ""

# Validação básica
Write-Host "Validando estrutura..." -ForegroundColor Yellow
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)

$hasManifest = $zip.Entries | Where-Object { $_.Name -eq "manifest.json" }
$hasIcons = $zip.Entries | Where-Object { $_.FullName -like "icons/*" }

if ($hasManifest) {
    Write-Host "[OK] manifest.json encontrado" -ForegroundColor Green
} else {
    Write-Host "[ERRO] manifest.json NÃO encontrado!" -ForegroundColor Red
}

if ($hasIcons) {
    Write-Host "[OK] Ícones encontrados" -ForegroundColor Green
} else {
    Write-Host "[AVISO] Nenhum ícone encontrado" -ForegroundColor Yellow
}

$zip.Dispose()

Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Teste a extensão localmente (about:debugging)" -ForegroundColor White
Write-Host "2. Acesse https://addons.mozilla.org/developers/" -ForegroundColor White
Write-Host "3. Faça upload do arquivo: $zipName" -ForegroundColor White
Write-Host ""
Write-Host "Pressione qualquer tecla para abrir o diretório..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Abre o diretório dist
Start-Process explorer.exe -ArgumentList $outputDir
