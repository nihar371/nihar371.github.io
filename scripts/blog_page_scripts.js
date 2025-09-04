// Hardcoded blog list – you can add more entries here
const blogs = [
  {
    file: "optimizing-sequential-models/",
    title: "Optimizing Sequential Models",
    date: "2025-09-04",
    description: "In this post, we're will be continue working on our sequential models, in the direction of optimizing them via. Pre-Training optimization methods like feature selection and Training optimization techniques like Batch Normalization and Layer Normalization. Also, we will be looking when to use each one of them, and will compare both of them for our use case. We will be comparing each one of them internally as well as with the original stacked model which with various layers.",
    image_path: "optimizing-sequential-models/thumbnail/model_evals.png"
  },
  {
    file: "comparing-sequential-models/",
    title: "Comparing Sequential Models",
    date: "2025-08-26",
    description: "In this post, we're putting three popular sequential models—RNN, LSTM, and GRU—to the test on the challenging task of predicting Ethereum's stock price. We'll explore how stacking layers impacts their performance and analyze their architectural differences to see which model truly comes out on top. This comparison will provide a practical look at why LSTMs and GRUs are often preferred for time-series forecasting.",
    image_path: "comparing-sequential-models/thumbnail/architecture_compare.png"
  },
  {
    file: "analyzing-time-series/",
    title: "AMD Time Series",
    date: "2025-05-01",
    description: "In this blog, we will be performing time series analysis on AMD's stock price, exploring its mathematical aspects in detail. We'll begin by conducting some data analysis, then transitioning to the mathematical foundations, including gaining a deep understanding of stationarity and becoming familiar with ACF, PACF, and EACF plots. We will also delve into modeling with ARIMA and SARIMA models. Furthermore, we will examine the usefulness of log transformations and evaluate our models using various residual analysis techniques, including the Ljung-Box test, among others.",
    image_path: "analyzing-time-series/thumbnail/amd_stock_price.png"
  },
  {
    file: "web-scraping-with-selenium/",
    title: "Web Scraping - Selenium",
    date: "2024-09-30",
    description: `Learn what web scraping is, why it’s important, and how Selenium makes it easier. Understand how to access elements within the DOM, and discover techniques to handle common obstacles such as advertisements, cookie pop-ups, and other interruptions. Explore simple workarounds like refreshing the page, introducing waits, and leveraging smart element-handling strategies to make scraping more efficient.`,
    image_path: "web-scraping-with-selenium/thumbnail/inspect.png"
  }
];

const blogGrid = document.getElementById("blogGrid");

blogs.forEach(blog => {
  const card = document.createElement("div");
  card.className = "blog-card";
  card.innerHTML = `
  <div class="thumbnail">
    <img src="${blog.image_path}"></img>
  </div>
  <div class="content">
    <h2><a href="${blog.file}">${blog.title}</a></h2>
    <div class="date">${blog.date}</div>
    <br>
    <div class="description">${blog.description}</div>
  </div>
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