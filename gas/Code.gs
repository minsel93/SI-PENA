function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('SI-PENA')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  try {
    return HtmlService.createHtmlOutputFromFile(filename).getContent();
  } catch (e) {
    // If it fails, try stripping 'form/' in case the user didn't include the folder name in GAS
    if (filename.startsWith('form/')) {
      var fallbackName = filename.replace('form/', '');
      try {
        return HtmlService.createHtmlOutputFromFile(fallbackName).getContent();
      } catch (e2) {
        return '<!-- Error loading template: ' + filename + ' -->';
      }
    }
    return '<!-- Error loading template: ' + filename + ' -->';
  }
}
