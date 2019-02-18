/* eslint-disable */
function getQueryParameter (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var params = window.location.search.substr(window.location.search.indexOf("?")+1)
  var r = params.match(reg)
  if (r != null)
    return decodeURIComponent(r[2]);
  return "";
}
