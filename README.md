# ⚡ Copy Image as WebP

### Right-click any image. Copy directly as WebP. Zero downloads.

```powershell
irm https://raw.githubusercontent.com/pikadexofc/copy-image-as-webp/main/install.ps1 | iex
```

> **⚡ 5-Second Instant Setup (Windows)**:
> 1. Copy the command above.
> 2. Paste into **PowerShell** and hit **Enter**.
> 3. Click **"Load unpacked"** in the browser window that opens, and press <kbd>Ctrl</kbd> + <kbd>V</kbd> + <kbd>Enter</kbd>.
> 
> *Everything else (downloading, unzipping, copying the folder path) is handled automatically.*

---

[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-38bdf8?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Compatible Browsers](https://img.shields.io/badge/Works_With-Chrome_|_Edge_|_Brave_|_Opera-10b981?style=for-the-badge)](https://github.com/pikadexofc/copy-image-as-webp)
[![Zero Tracking](https://img.shields.io/badge/Privacy-100%25_Local-a855f7?style=for-the-badge)](https://github.com/pikadexofc/copy-image-as-webp)
[![Support the Dev](https://img.shields.io/badge/☕_Support_Kori-Buy_Me_a_Cha-f59e0b?style=for-the-badge)](https://www.supportkori.com/mdzobaedislamshanto)

---

## 🎯 How It Works (In 0.5 Seconds)

![How It Works - 3 Easy Steps](assets/how-it-works.png)

1. **Spot Any Image** on any website or stock library.
2. **Right-Click ➔ "Copy Image as WebP"** (transcodes in memory with zero disk writes).
3. **Press Ctrl + V Anywhere** (Figma, Photoshop, WordPress, Discord, Slack, Notion).

---

## 💀 The Problem: The "Brain-Dead File Janitor" Tax

It is the year 2026. Humanity is deploying AI models to Mars, but when a web designer needs an optimized WebP image from the internet, they still have to:

1. Right-click ➔ `Save Image As...`
2. Save it to `~/Downloads/` (where `hero-banner(3).png` already lives).
3. Open a separate tab with Squoosh or CloudConvert.
4. Drag & drop the file into the converter.
5. Wait for the spinning wheel of death.
6. Click Download.
7. Go back to the Downloads folder.
8. Drag the new `.webp` file into Figma, WordPress, or your codebase.
9. Manually delete the original PNG so your hard drive doesn't choke.

**That’s 9 steps, 45 seconds of your finite human life, and a mountain of duplicate files just to copy ONE picture.**

---

## ✨ Features That Actually Matter

* 🚀 **Direct System Clipboard Copy**: Encodes and commits directly to your OS clipboard using Chromium's modern Async Clipboard API.
* 🛡️ **Universal Paste Compatibility**: Packed with multi-mime data (`text/html`, Web Custom Format, and OS fallback) so it pastes seamlessly into:
  * **Design & Dev**: Figma, Canva, Photoshop, VS Code, Notion.
  * **Messengers**: Slack, Discord, WhatsApp Web, Telegram.
  * **CMS**: WordPress, Shopify, Webflow, Framer.
* 📦 **Copy as WebP Data URL**: One-click copy of the raw `data:image/webp;base64,...` string for front-end developers who hate importing local assets.
* 🎚️ **Compression Quality Slider**: Built-in dark mode popup lets you dial quality between **50% and 100%** (preset to 92% balanced).
* 🔔 **Instant Toast Feedback**: Shows a non-intrusive floating badge displaying the final file size savings and image dimensions (e.g. `✓ Copied as WebP (114 KB • 1920×1080)`).
* 🔒 **100% Private & Local**: Zero telemetry. Zero servers. Zero analytics. All transcoding happens in an offscreen HTML5 canvas inside your browser.

---

## 🍎 Alternative Setup (Mac / Linux / Manual)

1. **[Download the ZIP](https://github.com/pikadexofc/copy-image-as-webp/releases/download/v1.0.1/copy-image-as-webp-v1.0.1.zip)** and extract it.
2. Open `chrome://extensions` or `edge://extensions`.
3. Enable **Developer mode** (top-right).
4. Click **Load unpacked** (top-left) and select the extracted folder.

---

## ☕ Support

If you find this tool useful, you can support future development:

<a href="https://www.supportkori.com/mdzobaedislamshanto" target="_blank" rel="noopener noreferrer">
  <img src="https://img.shields.io/badge/☕_Fund_the_development-Support_Kori-9333ea?style=for-the-badge&logoColor=white" alt="Fund the development" />
</a>

---

## 📜 License

MIT License © 2026 [Md Zobaed Islam Shanto](https://github.com/pikadexofc). Feel free to fork, customize, and share!
