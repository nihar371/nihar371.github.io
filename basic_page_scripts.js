// Page Progress-Bar -----------------------------------------------------------------
const progressBar = document.getElementById("bar");
window.onscroll = () => {
	const scroll = document.documentElement.scrollTop;
	const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
	let scrolled = (scroll / height) * 100;
  progressBar.style.width = scrolled + "%";
};

// Load Header -----------------------------------------------------------------
const header_element = document.getElementsByClassName('header')[0];
header_div = `
<div class="profile-container">
      <!-- Circular Profile Image -->
      <div class="profile-image">
        <img src="assets\\images\\profile\\my-profile-image.jpg" alt="Your Name">
      </div>
      <!-- Intro and Buttons -->
      <div class="intro">
        <h1>Nihar Patel</h1>
        <p>Machine Learning Engineer | Building intelligent systems to solve real-world problems.</p>
        <div class="social-buttons-grid">
          <a href="mailto:niharjpatel372001@gmail.com" class="social-button"><img src="assets\\images\\icons\\mail-logo.png" alt="mailto:niharjpatel372001@gmail.com"></a>
          <a href="https://github.com/nihar371" target="_blank" class="social-button"><img src="assets\\images\\icons\\github-logo.png" alt="GitHub:Nihar-Patel-371"></a>
          <a href="https://www.linkedin.com/in/niharpatel371/" target="_blank" class="social-button"><img src="assets\\images\\icons\\linkedin-logo.png" alt="LinkedIn:niharpatel371"></a>
          <a href="https://nihar-patel.medium.com/" target="_blank" class="social-button"><img src="assets\\images\\icons\\medium-logo.png" alt="Medium:nihar-patel"></a>
          <a href="https://www.kaggle.com/niharpatel03" target="_blank" class="social-button"><img src="assets\\images\\icons\\kaggle-logo.png" alt="Kaggle:niharpatel03"></a>
        </div>
      </div>
    </div>
`

// Navigation Grid -----------------------------------------------------------------
const navigation_element = document.getElementsByClassName('nav-grid')[0];
nav_buttons_div = `
<!-- About Button -->
<div class="page-nav-button" id="about-button" aria-label="View About Section">
	<a href="index.html">
		<span>About</span>
	</a>
</div>

<!-- Project Button -->
<div class="page-nav-button" id="project-button" aria-label="View Project Section">
	<a href="project.html">
	<span>Project</span>
	</a>
</div>

<!-- Blog Button -->
<div class="page-nav-button" id="blog-button" aria-label="View Blog Section">
	<a href="blog.html">
	<span>Blog</span>
	</a>
</div>
`

// Inject inside <header>
document.addEventListener("DOMContentLoaded", () => {
  // Set body formating
  body_element = document.getElementsByTagName('body')[0].setAttribute("style", "padding:0;");
  // Add header
  header_element.insertAdjacentHTML("afterbegin", header_div);
  // Add nav-grid
  navigation_element.insertAdjacentHTML("afterbegin", nav_buttons_div);
});