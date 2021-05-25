export function preloadImage(url) {
  if (!url) {
    return;
  }
  const img = document.createElement('img');
  img.src = url;
  img.style.display = 'none';
  document.body.append(img);
}
