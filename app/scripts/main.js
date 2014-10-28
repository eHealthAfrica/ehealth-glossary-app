'use strict';
$(function() {
  $.getJSON('https://script.google.com/macros/s/AKfycbxTSor3m5TaU1dYEpoltOsFwatsr64Ap1YLLL-qzhvw_TKGyyJc/exec?callback=?')
  .done(function (results) {
    var html = '<table class="table"><thead><tr><th>Term</th><th>Explanation</th><th>Description</th></tr></thead>';
    html += '<tbody>';
    results.map(function(row) {
      html += '<tr><th>'+row[0]+'</th><td>'+linkify(row[1])+'</td><td>'+linkify(row[2])+'</td>';
    });
    html += '</tbody>';
    html += '</table>';
    $('.main').html(html);
  });


  function linkify(inputText) {
      var replacedText, replacePattern1, replacePattern2, replacePattern3;

      //URLs starting with http://, https://, or ftp://
      replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
      replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">link</a>');

      //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
      replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
      replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

      //Change email addresses to mailto:: links.
      replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
      replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

      return replacedText;
  }
});
