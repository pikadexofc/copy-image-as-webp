@echo off
title Copy Image as WebP - 1-Click Installer
color 0b
cls

echo ======================================================
echo   Copy Image as WebP - Quick Installer
echo ======================================================
echo.

set "TARGET=%LocalAppData%\copy-image-as-webp"

echo [*] Installing extension to: %TARGET%
if not exist "%TARGET%" mkdir "%TARGET%" >nul 2>&1

:: Copy files cleanly
xcopy /s /e /y /q "%~dp0*" "%TARGET%\" >nul 2>&1

:: Copy the path to Windows clipboard automatically
powershell -Command "Set-Clipboard -Value '%TARGET%'" >nul 2>&1

echo [+] Extension installed successfully!
echo [+] Folder path copied to your CLIPBOARD.
echo.
echo [*] Opening Extensions page in your browser...
start chrome chrome://extensions >nul 2>&1 || start edge://extensions >nul 2>&1

echo.
echo ======================================================
echo   FINAL 2 STEPS IN YOUR BROWSER:
echo ======================================================
echo   1. Turn ON "Developer mode" (toggle in top-right)
echo   2. Click "Load unpacked" (button in top-left)
echo   3. Press Ctrl + V and hit Enter (Path is already copied!)
echo ======================================================
echo.
echo All done! You can close this window.
echo.
pause
