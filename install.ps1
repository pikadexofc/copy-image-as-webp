# install.ps1 - Automated 1-line installer for Copy Image as WebP
$ErrorActionPreference = 'SilentlyContinue'

Write-Host ""
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host "   ⚡ Copy Image as WebP - Automated Setup" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Cyan
Write-Host ""

$targetDir = "$env:LOCALAPPDATA\copy-image-as-webp"
$zipUrl = "https://github.com/pikadexofc/copy-image-as-webp/releases/download/v1.0.1/copy-image-as-webp-v1.0.1.zip"
$tempZip = "$env:TEMP\copy-image-as-webp.zip"

Write-Host "[1/4] Downloading latest extension files from GitHub..." -ForegroundColor Yellow
Invoke-WebRequest -Uri $zipUrl -OutFile $tempZip -UseBasicParsing

Write-Host "[2/4] Extracting files to local app data..." -ForegroundColor Yellow
if (-not (Test-Path $targetDir)) { 
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null 
}
Expand-Archive -Path $tempZip -DestinationPath $targetDir -Force
Remove-Item $tempZip -Force -ErrorAction SilentlyContinue

Write-Host "[3/4] Pre-configuring Developer Mode in Chrome..." -ForegroundColor Yellow

# Detect and pre-enable Developer Mode in all Chrome profiles so user never has to search for it
$chromeUserData = "$env:LOCALAPPDATA\Google\Chrome\User Data"
$activeProfile = "Default"

if (Test-Path $chromeUserData) {
    # Find most recently active profile
    $profiles = Get-ChildItem $chromeUserData -Directory | Where-Object { $_.Name -match "^(Default|Profile \d+)$" }
    $latest = $profiles | ForEach-Object { 
        $pref = Join-Path $_.FullName "Preferences"
        if (Test-Path $pref) { [PSCustomObject]@{ Name = $_.Name; Time = (Get-Item $pref).LastWriteTime } }
    } | Sort-Object Time -Descending | Select-Object -First 1
    
    if ($latest) { $activeProfile = $latest.Name }

    # Enable developer_mode = true across all profiles
    foreach ($prof in $profiles) {
        $prefPath = Join-Path $prof.FullName "Preferences"
        if (Test-Path $prefPath) {
            try {
                $content = Get-Content $prefPath -Raw -Encoding UTF8
                if ($content -match '"extensions"\s*:\s*\{') {
                    if ($content -match '"developer_mode"\s*:\s*(false|true)') {
                        $content = $content -replace '"developer_mode"\s*:\s*false', '"developer_mode":true'
                    } else {
                        $content = $content -replace '("extensions"\s*:\s*\{)', '$1"ui":{"developer_mode":true},'
                    }
                    Set-Content $prefPath -Value $content -Encoding UTF8 -Force
                }
            } catch {}
        }
    }
}

Write-Host "[4/4] Copying folder path to your clipboard..." -ForegroundColor Yellow
Set-Clipboard -Value $targetDir

Write-Host ""
Write-Host "[+] Extension installed to: $targetDir" -ForegroundColor Green
Write-Host "[+] Developer Mode pre-configured: ON" -ForegroundColor Green
Write-Host "[+] Folder path copied to your CLIPBOARD!" -ForegroundColor Green
Write-Host ""

$setupHtmlPath = Join-Path $targetDir "setup.html"

# Locate Chrome or Edge executable
$browserPath = (Get-ItemProperty 'HKLM:\Software\Microsoft\Windows\CurrentVersion\App Paths\chrome.exe' -ErrorAction SilentlyContinue).'(Default)'
$isChrome = $true
if (-not $browserPath -or -not (Test-Path $browserPath)) {
    $browserPath = (Get-ItemProperty 'HKLM:\Software\Microsoft\Windows\CurrentVersion\App Paths\msedge.exe' -ErrorAction SilentlyContinue).'(Default)'
    $isChrome = $false
}
if (-not $browserPath) { $browserPath = "chrome.exe" }

Write-Host "Opening setup guide in your active browser session..." -ForegroundColor Cyan

# Launch directly into the active profile without account chooser dialog!
if ($isChrome) {
    Start-Process $browserPath "--profile-directory=`"$activeProfile`" `"$setupHtmlPath`""
} else {
    Start-Process $browserPath "`"$setupHtmlPath`""
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  FINAL 2 CLICKS TO ACTIVATE:" -ForegroundColor White
Write-Host "======================================================" -ForegroundColor Green
Write-Host "  1. In Chrome, press Ctrl + T and type: chrome://extensions" -ForegroundColor White
Write-Host "  2. Click 'Load unpacked' -> Press Ctrl + V -> Hit Enter!" -ForegroundColor Yellow
Write-Host "  (Developer mode is ALREADY turned ON for you)" -ForegroundColor Cyan
Write-Host "======================================================" -ForegroundColor Green
Write-Host ""
