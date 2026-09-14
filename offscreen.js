// offscreen.js - Offscreen document for WebP image processing

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.target !== 'offscreen' || message.action !== 'convert-image') {
    return false;
  }

  handleConvertImage(message)
    .then((result) => sendResponse(result))
    .catch((err) => {
      console.error('Offscreen conversion error:', err);
      sendResponse({ success: false, error: err.message || 'Image processing failed' });
    });

  return true; // Keep channel open for async response
});

async function handleConvertImage(data) {
  const { srcUrl, quality = 0.92 } = data;

  // 1. Fetch image source
  let blob;
  if (srcUrl.startsWith('data:')) {
    blob = dataURItoBlob(srcUrl);
  } else {
    const response = await fetch(srcUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: HTTP ${response.status}`);
    }
    blob = await response.blob();
  }

  // 2. Load into HTML Image element to obtain natural dimensions
  const img = await loadImageElement(blob);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  if (!width || !height) {
    throw new Error('Invalid image dimensions');
  }

  // 3. Render onto Canvas
  const canvas = document.getElementById('conversion-canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d', { alpha: true });
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);

  // Clean up object URL
  if (img.src.startsWith('blob:')) {
    URL.revokeObjectURL(img.src);
  }

  // 4. Encode as WebP and PNG Data URLs
  try {
    const webpDataUrl = canvas.toDataURL('image/webp', quality);
    const pngDataUrl = canvas.toDataURL('image/png');

    // Calculate approximate binary size in bytes from base64
    const base64Data = webpDataUrl.split(',')[1] || '';
    const size = Math.round((base64Data.length * 3) / 4);

    return {
      success: true,
      webpDataUrl,
      pngDataUrl,
      size,
      width,
      height
    };
  } finally {
    // Immediately release backing store memory and GPU textures
    canvas.width = 0;
    canvas.height = 0;
  }
}

function loadImageElement(blob) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(blob);
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to decode image data'));
    };
    img.src = objectUrl;
  });
}

function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}
