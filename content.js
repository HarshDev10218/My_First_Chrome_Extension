// Swaps a single webpage image with a random cat image from the API
async function replaceImage(imgElement) {
  if (imgElement.dataset.replacedByCat) return;
  imgElement.dataset.replacedByCat = "true";

  try {
    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    
    if (data && data[0] && data[0].url) {
      // Lock dimensions to prevent layout shifting
      if (imgElement.width) imgElement.style.width = `${imgElement.width}px`;
      if (imgElement.height) imgElement.style.height = `${imgElement.height}px`;

      imgElement.src = data[0].url;
      imgElement.srcset = ''; // Clear source sets for responsive images
    }
  } catch (error) {
    console.error('Error fetching cat image:', error);
  }
}

// Scans and replaces all images currently on the page
function replaceExistingImages() {
  document.querySelectorAll('img').forEach(replaceImage);
}

// Watches for new images added to the page dynamically (scrolling/AJAX)
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.tagName === 'IMG') {
        replaceImage(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll('img').forEach(replaceImage);
      }
    });
  });
});

// Run the script
replaceExistingImages();
observer.observe(document.body, { childList: true, subtree: true });