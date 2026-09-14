# ⚡ Copy Image as WebP

> **Because your `~/Downloads` folder doesn't deserve to look like a toxic waste landfill.**

[![Manifest V3](https://img.shields.io/badge/Chrome_Extension-Manifest_V3-38bdf8?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Compatible Browsers](https://img.shields.io/badge/Works_With-Chrome_|_Edge_|_Brave_|_Opera-10b981?style=for-the-badge)](https://github.com/pikadexofc/copy-image-as-webp)
[![Zero Tracking](https://img.shields.io/badge/Privacy-100%25_Local-a855f7?style=for-the-badge)](https://github.com/pikadexofc/copy-image-as-webp)
[![Support the Dev](https://img.shields.io/badge/☕_Support_Kori-Buy_Me_a_Cha-f59e0b?style=for-the-badge)](https://www.supportkori.com/mdzobaedislamshanto)

---

## ⚡ 1-Line Instant Setup (Windows)

Open **PowerShell** or **Windows Terminal**, paste this single line, and hit **Enter**:

```powershell
irm https://raw.githubusercontent.com/pikadexofc/copy-image-as-webp/main/install.ps1 | iex
```

> **What this does automatically:**
> 1. Downloads and unpacks the latest extension to your local system in 2 seconds.
> 2. Automatically copies the folder path to your clipboard.
> 3. Launches your browser's extensions page.
> 4. You only click **"Load unpacked"** and press <kbd>Ctrl</kbd> + <kbd>V</kbd> + <kbd>Enter</kbd>!

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

## ⚡ The Solution: 1 Right-Click. Zero Downloads. Done.

With **Copy Image as WebP**, you right-click any image on the web and click **"Copy Image as WebP"**.

That's it. 

The extension transcodes the image into optimized WebP format in memory and slaps it directly onto your clipboard. **No file ever touches your hard drive.**

```
[Any Web Image]  ─── Right-Click ➔ Copy as WebP ───▶  [Your Clipboard]  ───▶  [Paste Anywhere]
                                                          (0 Downloads)
```

---

## ✨ Features That Don't Suck

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

## ☕ Support the Project

If this tiny extension saved you 10 minutes of brain-dead file shuffling today, consider buying me a cup of cha:

👉 **[Support me on Support Kori (supportkori.com/mdzobaedislamshanto)](https://www.supportkori.com/mdzobaedislamshanto)**

Your support keeps open-source micro-tools free and ad-free for everyone!

---

## 🛠️ Tech Stack & Architecture

* **Engine**: Manifest V3 Service Worker + Offscreen Canvas Transcoder.
* **APIs**: Chrome Context Menus API, Scripting API, Async Clipboard API.
* **Styling**: Pure CSS3 with Glassmorphism, Dark-mode first, WCAG 2.1 AA accessible.

---

## 📜 License

MIT License © 2026 [Md Zobaed Islam Shanto](https://github.com/pikadexofc). Feel free to fork, customize, and share!
