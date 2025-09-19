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

waitForElementObserver('#home-button', () => {

  const button = document.getElementById('home-button');

  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent redirection
    // Add your desired functionality here
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, for smooth scrolling
    });
  });
});


document.addEventListener('DOMContentLoaded', () => {
    const tags = document.querySelectorAll('.background-image-container');
    const displayTime = 20000; // How long each tag stays visible
    const transitionTime = 7500; // The CSS transition duration

    let currentTagIndex = 0;

    function cycleTags() {
        const currentTag = tags[currentTagIndex];
        currentTag.classList.add('visible');
        setTimeout(() => {
            currentTag.classList.remove('visible');
        }, displayTime);
        currentTagIndex = (currentTagIndex + 1) % tags.length;
        setTimeout(cycleTags, displayTime + transitionTime);
    }
    
    if (tags.length > 0) {
        cycleTags();
    }
});