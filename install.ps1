# install.ps1 - Automated 1-line installer for Copy Image as WebP
$ErrorActionPreference = 'Stop'

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   Copy Image as WebP - Automated Setup" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

$targetDir = "$env:LOCALAPPDATA\copy-image-as-webp"
$zipUrl = "https://github.com/pikadexofc/copy-image-as-webp/releases/download/v1.0.1/copy-image-as-webp-v1.0.1.zip"
$tempZip = "$env:TEMP\copy-image-as-webp.zip"

Write-Host "[1/3] Downloading latest extension files from GitHub..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $zipUrl -OutFile $tempZip -UseBasicParsing

Write-Host "[2/3] Extracting files..." -ForegroundColor Yellow
if (-not (Test-Path $targetDir)) { 
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null 
}
Expand-Archive -Path $tempZip -DestinationPath $targetDir -Force
Remove-Item $tempZip -Force -ErrorAction SilentlyContinue

Write-Host "[3/3] Copying folder path to your clipboard..." -ForegroundColor Yellow
Set-Clipboard -Value $targetDir

Write-Host ""
Write-Host "[+] Extension installed to: $targetDir" -ForegroundColor Green
Write-Host "[+] Folder path copied to your CLIPBOARD!" -ForegroundColor Green
Write-Host ""
Write-Host "Opening Extensions page in your browser..." -ForegroundColor Cyan

# Open browser to extensions page
try {
    Start-Process "chrome.exe" "chrome://extensions" -ErrorAction SilentlyContinue
} catch {
    Start-Process "msedge.exe" "edge://extensions" -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  FINAL 2 CLICKS IN YOUR BROWSER:" -ForegroundColor White
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  1. Turn ON 'Developer mode' (toggle in top-right)" -ForegroundColor White
Write-Host "  2. Click 'Load unpacked' (button in top-left)" -ForegroundColor White
Write-Host "  3. Press Ctrl + V and hit Enter (Path is already copied!)" -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
