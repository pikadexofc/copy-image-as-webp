# Copy Image as WebP ⚡📋

Copy Image as WebP is a high-performance browser extension designed to transcode web images locally to WebP and attach multi-representation clipboard data with zero disk downloads.

<div align="center">
  <img src="assets/brand/logo.png" alt="PixelPie Media Logo" width="300" />
</div>

<p align="center">
  <img src="https://img.shields.io/github/license/pikadexofc/copy-image-as-webp?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/github/last-commit/pikadexofc/copy-image-as-webp?style=flat-square" alt="Last Commit" />
</p>

---

## 🚀 Key Features

* **WebP Output**: The image is transcoded locally to WebP in memory with zero disk downloads.
* **Direct Clipboard Write**: Transcodes images locally and attaches multi-representation payloads (`web image/webp`, `text/html`, and `image/png`) directly to the clipboard.
* **Broad Clipboard Compatibility**: The clipboard includes compatibility representations (`image/png` and `text/html`) for applications that do not consume WebP directly. Desktop applications may consume PNG or another compatible representation instead of the WebP representation.
* **Base64 Data URL Mode**: Right-click to copy direct `data:image/webp;base64,...` URI strings for fast inline embedding.
* **Compression Quality Slider**: Integrated dark-mode popup lets you calibrate compression from **50% to Maximum Quality 100%** (default 92%).
* **100% Private & Local**: Zero telemetry, zero analytics, zero external network requests. All transcoding happens in an offscreen HTML5 canvas.

---

## ⚡ Quick Install (Windows 1-Liner)

Open **PowerShell** and paste:

```powershell
irm https://raw.githubusercontent.com/pikadexofc/copy-image-as-webp/main/install.ps1 | iex
```

> **Installation Flow:**
> 1. Downloads and extracts the latest release to `%LocalAppData%\copy-image-as-webp`.
> 2. Automatically copies the folder path to your **clipboard**.
> 3. Go to `chrome://extensions` ➔ toggle **Developer mode** on ➔ click **Load unpacked** ➔ press <kbd>Ctrl</kbd> + <kbd>V</kbd>.

---

## 🎯 How It Works

<div align="center">
  <img src="assets/how-it-works.png" alt="How It Works Overview" width="850" />
</div>

---

## 🛠️ Manual Installation (Mac / Linux / Windows)

**Prerequisites:** Chromium-based browser (Chrome, Edge, Brave, Opera, Arc).

1. **Download Release**:
   Download the latest [`copy-image-as-webp-v1.0.2.zip`](https://github.com/pikadexofc/copy-image-as-webp/releases/download/v1.0.2/copy-image-as-webp-v1.0.2.zip) and extract it.

2. **Load Unpacked**:
   - Navigate to `chrome://extensions` (or `edge://extensions`).
   - Enable **Developer mode** in the top-right corner.
   - Click **Load unpacked** in the top-left corner and select the extracted folder.

---

## ☕ Support

If you find this tool useful, you can fund its future development:

<p align="left">
  <a href="https://www.supportkori.com/mdzobaedislamshanto" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/☕_Fund_the_development-Support_Kori-9333ea?style=for-the-badge&logoColor=white" alt="Fund the development" />
  </a>
</p>

---

<div align="center">
  <p><b>PixelPie Media</b> • Made with ❤️ by Pickko</p>
  <p><i>Modern, minimal, and precise software utilities.</i></p>
</div>
