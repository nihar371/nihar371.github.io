function waitForElementObserver(selector, callback) {
  const observer = new MutationObserver((mutations) => {
    if (document.querySelector(selector)) {
      callback();
      observer.disconnect(); // Stop observing after the element is found
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

waitForElementObserver('#about-button', () => {

  const button = document.getElementById('about-button');

  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent redirection
    // Add your desired functionality here
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, for smooth scrolling
    });
  });
});



function setDynamicPadding() {
  const divElement = document.getElementsByClassName('paper')[0];
  const divHeight = divElement.offsetHeight;

  const paddingTop = divHeight * 0.10; 
  const paddingBottom = divHeight * 0.20;

  divElement.style.paddingTop = `${paddingTop}px`;
  divElement.style.paddingBottom = `${paddingBottom}px`;
}

window.addEventListener('load', setDynamicPadding);
window.addEventListener('resize', setDynamicPadding); 