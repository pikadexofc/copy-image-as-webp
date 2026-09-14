// background.js - Copy Image as WebP Service Worker

const CONTEXT_MENU_IDS = {
  COPY_WEBP: 'copy_image_as_webp',
  COPY_DATA_URL: 'copy_image_as_webp_data_url'
};

// Initialize settings and context menus on install/update
chrome.runtime.onInstalled.addListener(async () => {
  const defaults = {
    quality: 0.92,
    showToast: true
  };
  const current = await chrome.storage.local.get(Object.keys(defaults));
  await chrome.storage.local.set({ ...defaults, ...current });

  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: CONTEXT_MENU_IDS.COPY_WEBP,
      title: 'Copy Image as WebP',
      contexts: ['image']
    });

    chrome.contextMenus.create({
      id: CONTEXT_MENU_IDS.COPY_DATA_URL,
      title: 'Copy Image as WebP Data URL',
      contexts: ['image']
    });
  });
});

let offscreenCloseTimer = null;

// Ensure offscreen document is open for cross-origin image canvas operations
async function setupOffscreenDocument() {
  if (offscreenCloseTimer) {
    clearTimeout(offscreenCloseTimer);
    offscreenCloseTimer = null;
  }
  if (await chrome.offscreen.hasDocument()) {
    return;
  }
  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: ['CLIPBOARD'],
    justification: 'Convert image to WebP format via Offscreen Canvas'
  });
}

// Automatically close offscreen document after an idle period to reclaim memory
function scheduleOffscreenClose(delayMs = 15000) {
  if (offscreenCloseTimer) {
    clearTimeout(offscreenCloseTimer);
  }
  offscreenCloseTimer = setTimeout(async () => {
    try {
      if (await chrome.offscreen.hasDocument()) {
        await chrome.offscreen.closeDocument();
      }
    } catch {
      // Ignored if document already closed or in transition
    }
  }, delayMs);
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (![CONTEXT_MENU_IDS.COPY_WEBP, CONTEXT_MENU_IDS.COPY_DATA_URL].includes(info.menuItemId)) {
    return;
  }

  const srcUrl = info.srcUrl;
  if (!srcUrl) {
    showErrorToast(tab?.id, 'No image source detected.');
    return;
  }

  try {
    const settings = await chrome.storage.local.get({
      quality: 0.92,
      showToast: true
    });

    await setupOffscreenDocument();

    // Check if image is a page-scoped blob URL
    let payloadUrl = srcUrl;
    if (srcUrl.startsWith('blob:') && tab?.id) {
      try {
        const [result] = await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: async (blobUrl) => {
            const res = await fetch(blobUrl);
            const blob = await res.blob();
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
          },
          args: [srcUrl]
        });
        if (result?.result) {
          payloadUrl = result.result;
        }
      } catch (err) {
        console.warn('Page blob extraction failed, falling back to direct URL', err);
      }
    }

    // Convert image to WebP & PNG base64 in offscreen document (handles CORS cleanly)
    const response = await chrome.runtime.sendMessage({
      target: 'offscreen',
      action: 'convert-image',
      srcUrl: payloadUrl,
      quality: settings.quality
    });

    if (!response?.success) {
      showErrorToast(tab?.id, response?.error || 'Failed to convert image');
      return;
    }

    const isDataUrlMode = info.menuItemId === CONTEXT_MENU_IDS.COPY_DATA_URL;

    // Write to clipboard inside the active tab context where the document has active user focus
    if (tab?.id) {
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async (webpDataUrl, pngDataUrl, isDataUrl, width, height, size, showToast) => {
          try {
            window.focus();

            function b64toBlob(dataURI) {
              const parts = dataURI.split(',');
              const byteString = atob(parts[1]);
              const mimeString = parts[0].split(':')[1].split(';')[0];
              const ab = new ArrayBuffer(byteString.length);
              const ia = new Uint8Array(ab);
              for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
              }
              return new Blob([ab], { type: mimeString });
            }

            if (isDataUrl) {
              await navigator.clipboard.writeText(webpDataUrl);
            } else {
              const webpBlob = b64toBlob(webpDataUrl);
              const pngBlob = b64toBlob(pngDataUrl);
              const htmlBlob = new Blob([`<img src="${webpDataUrl}" width="${width}" height="${height}">`], {
                type: 'text/html'
              });
              const textBlob = new Blob([webpDataUrl], { type: 'text/plain' });

              const clipboardData = {
                'image/png': pngBlob,
                'text/html': htmlBlob,
                'text/plain': textBlob,
                'web image/webp': webpBlob
              };

              await navigator.clipboard.write([new ClipboardItem(clipboardData)]);
            }

            if (showToast) {
              const TOAST_ID = '__copy_image_as_webp_toast__';
              let existing = document.getElementById(TOAST_ID);
              if (existing) existing.remove();

              const sizeKb = (size / 1024).toFixed(1);
              const text = isDataUrl
                ? '✓ WebP Data URL copied!'
                : `✓ Copied as WebP (${sizeKb} KB • ${width}×${height})`;

              const toast = document.createElement('div');
              toast.id = TOAST_ID;
              toast.textContent = text;
              Object.assign(toast.style, {
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: '2147483647',
                padding: '12px 18px',
                backgroundColor: 'rgba(15, 23, 42, 0.94)',
                color: '#ffffff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '13px',
                fontWeight: '500',
                lineHeight: '1.4',
                borderRadius: '10px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                pointerEvents: 'none',
                opacity: '0',
                transform: 'translateY(-8px) scale(0.96)',
                transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              });

              document.body.appendChild(toast);
              requestAnimationFrame(() => {
                toast.style.opacity = '1';
                toast.style.transform = 'translateY(0) scale(1)';
              });

              setTimeout(() => {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(-6px) scale(0.96)';
                setTimeout(() => toast.remove(), 250);
              }, 2400);
            }
          } catch (writeErr) {
            console.error('In-tab clipboard write error:', writeErr);
            throw writeErr;
          }
        },
        args: [
          response.webpDataUrl,
          response.pngDataUrl,
          isDataUrlMode,
          response.width,
          response.height,
          response.size,
          settings.showToast
        ]
      });
    }
  } catch (error) {
    console.error('Copy as WebP error:', error);
    showErrorToast(tab?.id, error.message || 'Error copying image');
  } finally {
    scheduleOffscreenClose();
  }
});

// Reclaim offscreen resources if background service worker is suspended
if (chrome.runtime?.onSuspend) {
  chrome.runtime.onSuspend.addListener(async () => {
    try {
      if (await chrome.offscreen.hasDocument()) {
        await chrome.offscreen.closeDocument();
      }
    } catch {
      // Ignored
    }
  });
}

function showErrorToast(tabId, message) {
  if (!tabId) return;
  chrome.scripting.executeScript({
    target: { tabId },
    func: (text) => {
      const TOAST_ID = '__copy_image_as_webp_toast__';
      let existing = document.getElementById(TOAST_ID);
      if (existing) existing.remove();

      const toast = document.createElement('div');
      toast.id = TOAST_ID;
      toast.textContent = text;
      Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '2147483647',
        padding: '12px 18px',
        backgroundColor: 'rgba(127, 29, 29, 0.95)',
        color: '#ffffff',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '13px',
        fontWeight: '500',
        borderRadius: '10px',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
        pointerEvents: 'none',
        opacity: '1'
      });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3500);
    },
    args: [message]
  }).catch(() => {});
}
