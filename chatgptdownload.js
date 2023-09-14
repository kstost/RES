async function toDataURL(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
async function convertImagesToBase64() {
  const images = document.querySelectorAll('img');
  for (let img of images) {
    if (img.src) {
      try {
        const dataURL = await toDataURL(img.src);
        img.src = dataURL;
      } catch (error) {
        console.error(`Failed to convert image ${img.src} to base64: ${error}`);
      }
    }
  }
}
function applyInlineStyles(element, parentStyles = {}) {
  const styles = getComputedStyle(element);
  let appliedStyles = {};
  for (const [key, value] of Object.entries(styles)) {
    if (key === 'length' || key === '0') continue;
    if (parentStyles[key] !== value) {
      appliedStyles[key] = value;
    }
  }
  for (const [key, value] of Object.entries(appliedStyles)) {
    element.style[key] = value;
  }
  for (const child of element.children) {
    applyInlineStyles(child, appliedStyles);
  }
}
function downloadHTML(htmlDocument) {
  const blob = new Blob([htmlDocument], { type: "text/html" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "document.html";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
async function main() {
  await convertImagesToBase64();
  [...document.querySelectorAll('div.ml-12.flex.items-center.gap-2[role="button"]')].forEach(btn => btn.click());
  while (true) {
    let allopen = [...document.querySelectorAll('div.ml-12.flex.items-center.gap-2[role="button"]')].map(a => a.innerText).filter(a => a === 'Show work').length === 0;
    if (allopen) break;
    await new Promise(a => setTimeout(a));
  }
  document.body.innerHTML = [...document.querySelectorAll('div')].filter(a => a.className.startsWith('flex flex-col text-sm'))[0].innerHTML;
  [...document.querySelectorAll('header')].forEach(a => a.remove());
  [...document.querySelectorAll('img[alt="User"].rounded-sm')].forEach(a => {
    a.removeAttribute('srcset');
    a.src = [
      "data:image/jpeg;base64,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",
    ].join('');
  });
  [...document.documentElement.querySelectorAll('script')].forEach(a => a.remove());
  let list = [...document.documentElement.querySelectorAll('link')].map(a => {
    return a.href;
  }).filter(a => a.endsWith('.css'));
  for (let i = 0; i < list.length; i++) {
    let res = await fetch(list[i]);
    let css = await res.text();
    let style = document.createElement('style');
    style.innerHTML = css;
    document.head.appendChild(style);
  }
  [...document.documentElement.querySelectorAll('link')].forEach(a => a.remove());
  downloadHTML(`<!DOCTYPE html>\n<html>${document.documentElement.innerHTML}</html>`);
}
main().catch(error => console.error(error));
