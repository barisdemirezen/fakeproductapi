const navbar = document.querySelector('.navbar');
const requestAddress = document.querySelector('#request-address');
const requestButton = document.querySelector('#request-button');
const responseArea = document.querySelector('#response-area');

let status;
window.onscroll = function(e) {
    status = this.oldScroll < this.scrollY;
    if(window.scrollY > 150 && status)
    {
        navbar.style.top = `-${navbar.offsetHeight}`;
    }
    else
    {
        navbar.style.top = `0`;
    }
    this.oldScroll = this.scrollY
  }

requestButton.onclick = function(e) {
    let response = '';
    fetch(`${document.location.origin}/api/${requestAddress.value}`)
    .then( (res) => res.json())
    .then( (result) => response = JSON.stringify(result))
    .then(() => responseArea.innerHTML = response)  
}