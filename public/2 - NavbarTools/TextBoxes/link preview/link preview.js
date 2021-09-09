// Script Order 0041:


const linkPreviewGenerator = require("link-preview-generator");

const previewData = await linkPreviewGenerator(
  "https://www.youtube.com/watch?v=8mqqY2Ji7_g"
);
console.log(previewData);