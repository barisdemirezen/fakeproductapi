
const requestAddress = $('#request-address');
const responseArea = $('#response-area');
const pageUrl = $('#page-url');

$(document).ready(function() {
    makeRequest('product');

    $('#fullpage').fullpage({
        anchors: ['oku', 'dene', 'ogren', 'gelistir'],
        sectionsColor: ['#FFFFFF', '#074173', '#117EA9', 'black'],
        normalScrollElements: '#test-area',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Oku', 'Dene', 'Öğren', 'Geliştir']
    });

});

requestAddress.keyup( async function(e) {
    if (e.keyCode == '13') {
        await makeRequest();
      }
});

$('#request-button').click(async function(e) {
    await makeRequest();
});

async function makeRequest(defaultReq = requestAddress.val()) {
  let response = await getResponse(defaultReq);
  if (response == null) {
    responseArea.html("Bu istek için bir sonuç bulamadık.");
  } else {
    let str = JSON.stringify(response, null, 2);
    responseArea.html(str);
    Prism.highlightAll();
  }
}

async function getResponse(reqUrl) {
  
    return fetch(`${document.location.origin}/api/${reqUrl}`)
    .then((res) => res.json())
    .then((result) => {return result})
    .catch((err) => {});

}
