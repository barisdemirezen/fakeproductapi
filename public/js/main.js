const navbar = document.querySelector('.navbar');
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