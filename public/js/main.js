
const requestAddress = $('#request-address');
const responseArea = $('#response-area');
const pageUrl = $('#page-url');

const pageHeight = window.innerHeight;

let isScrolling = false;
let status;


$(document).ready(function() {
    pageUrl.text(`${document.location.origin}/api/`);
    makeRequest('product');

    $('#fullpage').fullpage({
        sectionsColor: ['#ffffff', '#074173', '#7BAABE']
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
