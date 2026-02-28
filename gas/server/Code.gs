/**
 * SI-PENA: Sistem Pelaporan Kesehatan Anak
 * Main Controller for GAS Web App
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('SI-PENA | Sistem Pelaporan Kesehatan Anak')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// Helper function to include HTML files
function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    return `<!-- Error including ${filename}: ${e.message} -->`;
  }
}

// Routing logic to get partials
function getPartial(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    throw new Error(`File ${filename} tidak ditemukan!`);
  }
}
