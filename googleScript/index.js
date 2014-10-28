function doGet(request) {
  var callbackName = request.parameters.callback;
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JAVASCRIPT);

  // https://docs.google.com/a/ehealthnigeria.org/spreadsheets/d/17u_tXiQ5tb9Exp6LbKAkMgzPnF-ru58tXTeVZzsNLSw/edit#gid=0
  // => id is "17u_tXiQ5tb9Exp6LbKAkMgzPnF-ru58tXTeVZzsNLSw"
  var sheet = SpreadsheetApp.openById('17u_tXiQ5tb9Exp6LbKAkMgzPnF-ru58tXTeVZzsNLSw').getSheets()[0];
  var data = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();

  output.setContent(callbackName+'('+JSON.stringify(data)+')');
  return output;
}
