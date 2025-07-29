const header_nav_elements = `
  <!-- Scroll bar -->
  <div id="bar"></div>

  <!-- Top Section -->
  <div class="header">
    <div class="profile-container">
      <!-- Circular Profile Image -->
      <div class="profile-image">
        <img src="../../assets/images/profile/my-profile-image.jpg" alt="Your Name">
      </div>
      <!-- Intro and Buttons -->
      <div class="intro">
        <h1>Nihar Patel</h1>
        <p>Machine Learning Engineer | Building intelligent systems to solve real-world problems.</p>
        <div class="social-buttons-grid">
          <a href="mailto:niharjpatel372001@gmail.com" class="social-button"><img src="../../assets/images/icons/mail-logo.png" alt="mailto:niharjpatel372001@gmail.com"></a>
          <a href="https://github.com/Nihar-Patel-371" target="_blank" class="social-button"><img src="../../assets/images/icons/github-logo.png" alt="GitHub:Nihar-Patel-371"></a>
          <a href="https://www.linkedin.com/in/niharpatel371/" target="_blank" class="social-button"><img src="../../assets/images/icons/linkedin-logo.png" alt="LinkedIn:niharpatel371"></a>
          <a href="https://nihar-patel.medium.com/" target="_blank" class="social-button"><img src="../../assets/images/icons/medium-logo.png" alt="Medium:nihar-patel"></a>
          <a href="https://www.kaggle.com/niharpatel03" target="_blank" class="social-button"><img src="../../assets/images/icons/kaggle-logo.png" alt="Kaggle:niharpatel03"></a>
        </div>
      </div>
    </div>
  </div>

  <!-- Navigation Panel -->
  <div class="nav-grid">
    <!-- About Button -->
    <div class="page-nav-button" id="about-button" aria-label="View About Section">
      <a href="../../index.html">
        <span>About</span>
      </a>
    </div>

    <!-- Project Button -->
    <div class="page-nav-button" id="project-button" aria-label="View Project Section">
      <a href="../../project.html">
        <span>Project</span>
      </a>
    </div>

    <!-- Blog Button -->
    <div class="page-nav-button" id="blog-button" aria-label="View Blog Section">
      <a href="../../blog.html">
        <span>Blog</span>
      </a>
    </div>
  </div>
`;

// Inject at top of <body>
document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", header_nav_elements);
  document.getElementsByTagName('body')[0].setAttribute("style", "padding:0;");

  // Page Progress-Bar
  const progressBar = document.getElementById("bar");
  window.onscroll = () => {
    const scroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (scroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  };
});