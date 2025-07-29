// Hardcoded blog list – you can add more entries here
const blogs = [
  {
    file: "blogs\\AMD Time Seris\\Time-series.html",
    title: "AMD Time Series",
    date: "2025-05-01"
  },
  {
    file: "blogs\\Web Scraping - Selenium\\web scraping with selenium.html",
    title: "Web Scraping - Selenium",
    date: "2025-05-14"
  }
];

const blogGrid = document.getElementById("blogGrid");

blogs.forEach(blog => {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.innerHTML = `
    <h2><a href="${blog.file}">${blog.title}</a></h2>
    <div class="date">${blog.date}</div>
    <div class="content"></div>
  `;
  blogGrid.appendChild(card);
});




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

waitForElementObserver('#blog-button', () => {

  const button = document.getElementById('blog-button');

  button.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent redirection
    // Add your desired functionality here
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Optional, for smooth scrolling
    });
  });
});