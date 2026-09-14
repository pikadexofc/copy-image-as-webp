// popup.js - Copy Image as WebP settings controller

document.addEventListener('DOMContentLoaded', async () => {
  const qualityRange = document.getElementById('quality-range');
  const qualityVal = document.getElementById('quality-val');
  const toggleToast = document.getElementById('toggle-toast');
  const presetButtons = document.querySelectorAll('.preset-btn');

  // Load saved preferences
  const settings = await chrome.storage.local.get({
    quality: 0.92,
    showToast: true
  });

  const initialQualityPercent = Math.round(settings.quality * 100);
  qualityRange.value = initialQualityPercent;
  qualityVal.textContent = `${initialQualityPercent}%`;
  toggleToast.checked = settings.showToast;
  updatePresetButtons(initialQualityPercent);

  // Quality Slider Input
  qualityRange.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    qualityVal.textContent = `${val}%`;
    updatePresetButtons(val);
    saveSettings({ quality: val / 100 });
  });

  // Preset Buttons
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const q = parseInt(btn.dataset.quality, 10);
      qualityRange.value = q;
      qualityVal.textContent = `${q}%`;
      updatePresetButtons(q);
      saveSettings({ quality: q / 100 });
    });
  });

  // Toast Toggle
  toggleToast.addEventListener('change', (e) => {
    saveSettings({ showToast: e.target.checked });
  });

  function updatePresetButtons(currentQuality) {
    presetButtons.forEach((btn) => {
      if (parseInt(btn.dataset.quality, 10) === currentQuality) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function saveSettings(obj) {
    chrome.storage.local.set(obj);
  }
});
