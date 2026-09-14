# Copy Image as WebP ⚡

A lightweight, high-performance browser extension designed to transcode and copy any web image directly to the system clipboard in WebP format with zero local downloads.

<p align="center">
  <img src="https://img.shields.io/github/v/release/pikadexofc/copy-image-as-webp?style=flat-square&color=9333ea" alt="Release" />
  <img src="https://img.shields.io/badge/Manifest-V3-38bdf8?style=flat-square" alt="Manifest V3" />
  <img src="https://img.shields.io/github/license/pikadexofc/copy-image-as-webp?style=flat-square" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome" />
  <img src="https://img.shields.io/github/last-commit/pikadexofc/copy-image-as-webp?style=flat-square" alt="Last Commit" />
</p>

---

## ⚡ Quick Install (Windows 1-Liner)

Open **PowerShell** and run:

```powershell
irm https://raw.githubusercontent.com/pikadexofc/copy-image-as-webp/main/install.ps1 | iex
```

> **What this does:**
> 1. Downloads and extracts the latest release to `%LocalAppData%\copy-image-as-webp`.
> 2. Copies the directory path directly to your **clipboard**.
> 3. Open `chrome://extensions` ➔ toggle **Developer mode** ➔ click **Load unpacked** ➔ press <kbd>Ctrl</kbd> + <kbd>V</kbd>.

---

## 🎯 How It Works

<div align="center">
  <img src="assets/how-it-works.png" alt="How It Works Overview" width="900" />
</div>

1. **Right-Click** any image on the web.
2. Select **"Copy Image as WebP"** (transcodes in an offscreen canvas in memory).
3. **Paste (`Ctrl+V`)** directly into Figma, Photoshop, WordPress, Slack, Discord, or Notion.

---

## 🚀 Key Features

* **Direct Clipboard Write**: Encodes in-memory WebP and writes multi-MIME payloads (`image/png` fallback, `text/html`, and `web image/webp`) directly into the OS clipboard.
* **Zero Disk Footprint**: Eliminates downloading temporary PNG/JPEG files to your disk.
* **Universal Paste Compatibility**: Works seamlessly across design tools (Figma, Photoshop), communication apps (Slack, Discord), and CMS platforms (WordPress, Shopify, Webflow).
* **Base64 Data URL Mode**: Right-click to grab direct `data:image/webp;base64,...` URI strings for fast inline embedding.
* **Quality Slider**: Integrated popup lets you calibrate compression from **50% to 100%** (default 92%).
* **100% Private & Local**: Zero telemetry, zero analytics, zero external API dependencies.

---

## 💻 Manual Installation (All Platforms)

1. Download [`copy-image-as-webp-v1.0.1.zip`](https://github.com/pikadexofc/copy-image-as-webp/releases/download/v1.0.1/copy-image-as-webp-v1.0.1.zip).
2. Extract the archive to a local folder.
3. Open `chrome://extensions` (or `edge://extensions` / `brave://extensions`).
4. Enable **Developer mode** (top-right toggle).
5. Click **Load unpacked** (top-left) and select the extracted folder.

---

## ☕ Support

If you find this tool useful, consider supporting future open-source development:

<a href="https://www.supportkori.com/mdzobaedislamshanto" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/☕_Fund_the_development-Support_Kori-9333ea?style=for-the-badge&logoColor=white" alt="Fund the development" />
</a>

---

## 📜 License

MIT © [Md Zobaed Islam Shanto](https://github.com/pikadexofc)

<div align="center">
  <p><b>PixelPie Media</b> • Made with ❤️ by Pickko</p>
  <p><i>Modern, minimal, and precise software utilities.</i></p>
</div>
