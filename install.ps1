# install.ps1 - Safe, transparent installer for Copy Image as WebP
$ErrorActionPreference = 'Stop'

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   ⚡ Copy Image as WebP - Clean Setup" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

$targetDir = "$env:LOCALAPPDATA\copy-image-as-webp"
$zipUrl = "https://github.com/pikadexofc/copy-image-as-webp/releases/download/v1.0.2/copy-image-as-webp-v1.0.2.zip"
$tempZip = "$env:TEMP\copy-image-as-webp.zip"

Write-Host "[1/3] Downloading extension from GitHub..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $zipUrl -OutFile $tempZip -UseBasicParsing

Write-Host "[2/3] Extracting files to: $targetDir" -ForegroundColor Yellow
if (-not (Test-Path $targetDir)) { 
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null 
}
Expand-Archive -Path $tempZip -DestinationPath $targetDir -Force
Remove-Item $tempZip -Force -ErrorAction SilentlyContinue

Write-Host "[3/3] Copying folder path to your clipboard..." -ForegroundColor Yellow
Set-Clipboard -Value $targetDir

Write-Host ""
Write-Host "[+] Installed cleanly to: $targetDir" -ForegroundColor Green
Write-Host "[+] Folder path copied to your CLIPBOARD!" -ForegroundColor Green
Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  TO ACTIVATE IN YOUR BROWSER:" -ForegroundColor White
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "  1. Open a new tab in Chrome and go to: chrome://extensions" -ForegroundColor White
Write-Host "  2. Turn ON 'Developer mode' (top-right toggle)" -ForegroundColor White
Write-Host "  3. Click 'Load unpacked' (top-left) and press Ctrl + V" -ForegroundColor Yellow
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""
