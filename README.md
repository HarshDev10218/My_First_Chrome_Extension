# 🐱 Cat Image Replacer

A lightweight browser extension that replaces every image on a webpage with a random cat picture, courtesy of [The Cat API](https://thecatapi.com/).

## Features

- Replaces all `<img>` elements on any page you visit with random cats
- Automatically catches new images added dynamically (infinite scroll, AJAX-loaded content, etc.) via a `MutationObserver`
- Preserves original image dimensions to avoid layout shifting
- Zero configuration — just install and browse

## How It Works

The extension injects a content script (`content.js`) into every page (`<all_urls>`), which:

1. Scans the page for all existing `<img>` elements on load
2. Fetches a random cat image URL from `https://api.thecatapi.com/v1/images/search` for each one
3. Swaps the image `src` (and clears `srcset` to prevent the browser from reverting to the original responsive image)
4. Locks the image's width/height to its original rendered size so the page layout doesn't jump around
5. Watches the DOM for newly added images and replaces those too

Each image is only replaced once, tracked via a `data-replaced-by-cat` attribute.

## Installation (Chrome / Chromium-based browsers)

1. Clone or download this repository
2. Open `chrome://extensions` in your browser
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the folder containing `manifest.json`
6. Browse the web and enjoy an internet full of cats 🐾

## Files

| File | Description |
|------|--------------|
| `manifest.json` | Extension manifest (Manifest V3) |
| `content.js` | Content script that performs the image replacement |

## Notes

- Requires an internet connection, since images are fetched live from The Cat API
- Some sites with strict Content Security Policies (CSP) may block requests to `thecatapi.com`
- This is a fun/novelty project — not intended for production use

## License

MIT
