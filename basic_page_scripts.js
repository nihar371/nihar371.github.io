// This event listener ensures all the code inside it only runs after the page's HTML is fully loaded.
document.addEventListener("DOMContentLoaded", () => {
  /**
   * This function finds the .header element and injects the profile and music player HTML.
   * Crucially, it only tries to initialize the music player *after* the HTML is successfully added.
   */
  function loadHeader() {
    const header_element = document.querySelector('.header');
    // Only proceed if the main header container exists on the page.
    if (header_element) {
      const header_div = `
        <div class="profile-container">
          <!-- Circular Profile Image -->
          <div class="profile-image">
            <img src="assets/images/profile/my-profile-image.jpg" alt="Your Name">
          </div>
          <!-- Intro and Buttons -->
          <div class="intro">
            <h1>Nihar Patel</h1>
            <p>Machine Learning Engineer | Building intelligent systems to solve real-world problems.</p>
            <div class="social-buttons-grid">
              <a href="mailto:niharjpatel372001@gmail.com" class="social-button"><img src="assets/images/icons/mail-logo.png" alt="mailto:niharjpatel372001@gmail.com"></a>
              <a href="https://github.com/nihar371" target="_blank" class="social-button"><img src="assets/images/icons/github-logo.png" alt="GitHub:Nihar-Patel-371"></a>
              <a href="https://www.linkedin.com/in/niharpatel371/" target="_blank" class="social-button"><img src="assets/images/icons/linkedin-logo.png" alt="LinkedIn:niharpatel371"></a>
              <a href="https://nihar-patel.medium.com/" target="_blank" class="social-button"><img src="assets/images/icons/medium-logo.png" alt="Medium:nihar-patel"></a>
              <a href="https://www.kaggle.com/niharpatel03" target="_blank" class="social-button"><img src="assets/images/icons/kaggle-logo.png" alt="Kaggle:niharpatel03"></a>
            </div>
          </div>
        </div>
            
        <div class="music-container" id="music-container">
          <div class="img-container">
            <img src="" alt="music-cover" id="cover">
          </div>
          <!-- The music info panel -->
          <div class="music-info">
            <h4 id="title">Song Title</h4> 
            <div class="progress-container" id="progress-container">
              <div class="progress" id="progress"></div>
            </div>
            <div class="time-info">
              <span id="currTime">00 : 00</span>
              <span id="durTime">00 : 00</span>
            </div>
          </div>
          <audio src="" id="audio"></audio>
          <div class="navigation">
            <button id="prev" class="action-btn">
              <img src="assets/images/music_icons/backward-full.svg" alt="Previous">
            </button>
            <button id="play" class="action-btn action-btn-big">
              <img id="play-icon" src="assets/images/music_icons/play-full.svg" alt="Play">
            </button>
            <button id="next" class="action-btn">
              <img src="assets/images/music_icons/forward-full.svg" alt="Next">
            </button>
          </div>
        </div>
      `;
      header_element.insertAdjacentHTML("afterbegin", header_div);

      // NOW that the HTML is guaranteed to be on the page, initialize the player.
      initializeMusicPlayer();

    } else {
      // If the .header element isn't found, log an error to the console for debugging.
      console.error("Header element with class '.header' not found. Music player could not be loaded.");
    }
  }

  /**
   * This function finds the .nav-grid element and injects the navigation buttons.
   */
  function loadNav() {
    const navigation_element = document.querySelector('.nav-grid');
    if (navigation_element) {
      const nav_buttons_div = `
        <div class="page-nav-button" id="about-button" aria-label="View About Section"><a href="index.html"><span>About</span></a></div>
        <div class="page-nav-button" id="project-button" aria-label="View Project Section"><a href="project.html"><span>Project</span></a></div>
        <div class="page-nav-button" id="blog-button" aria-label="View Blog Section"><a href="blog.html"><span>Blog</span></a></div>
      `;
      navigation_element.insertAdjacentHTML("afterbegin", nav_buttons_div);
    }
  }

  /**
   * Sets up the scroll progress bar functionality.
   */
  function setupProgressBar() {
    const progressBar = document.getElementById("bar");
    if (progressBar) {
      window.onscroll = () => {
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (scroll / height) * 100;
        progressBar.style.width = scrolled + "%";
      };
    }
  }

  /**
   * Contains all the logic for the music player.
   * This function should only be called after the player's HTML has been injected.
   */
  function initializeMusicPlayer() {
    // Select all the necessary music player elements
    const musicContainer = document.getElementById('music-container');
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const playIcon = document.getElementById('play-icon');
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const title = document.getElementById('title');
    const cover = document.getElementById('cover');
    const currTimeSpan = document.querySelector('#currTime');
    const durTimeSpan = document.querySelector('#durTime');

    // This check prevents errors if the music player HTML failed to load.
    if (!musicContainer) return;

    // Configure songs and file paths
    const songs = ['Heart_Attack', 'kyoto', 'Stoned_And_Sedated', 'My_Songs_Know_What_You_Did_In_The_Dark'];
    const audioFolderPath = 'music/audio/';
    const thumbnailFolderPath = 'music/thumbnail/';
    let songIndex = 0;

    // Core player functions
    function loadSong(song) {
      title.innerText = song.replace(/_|-/g, ' ');
      audio.src = `${audioFolderPath}${song}.mp3`;
      cover.src = `${thumbnailFolderPath}${song}.webp`;
    }

    function playSong() {
      musicContainer.classList.add('play');
      playIcon.src = 'assets/images/music_icons/pause-full.svg';
      playIcon.alt = 'Pause';
      audio.play();
    }

    function pauseSong() {
      musicContainer.classList.remove('play');
      playIcon.src = 'assets/images/music_icons/play-full.svg';
      playIcon.alt = 'Play';
      audio.pause();
    }

    function prevSong() {
      songIndex--;
      if (songIndex < 0) { songIndex = songs.length - 1; }
      loadSong(songs[songIndex]);
      playSong();
    }

    function nextSong() {
      songIndex++;
      if (songIndex > songs.length - 1) { songIndex = 0; }
      loadSong(songs[songIndex]);
      playSong();
    }

    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      if (duration) {
          const progressPercent = (currentTime / duration) * 100;
          progress.style.width = `${progressPercent}%`;
          currTimeSpan.innerText = formatTime(currentTime);
      }
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
    }

    function setDuration() {
      if (audio.duration) {
        durTimeSpan.innerText = formatTime(audio.duration);
      }
    }

    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    }

    // Attach Event Listeners
    playBtn.addEventListener('click', () => {
      const isPlaying = musicContainer.classList.contains('play');
      isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setDuration);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', nextSong);

    // Initialize the player
    loadSong(songs[songIndex]);
  }
  
  // Run the functions to build the page.
  loadHeader();
  loadNav();
  setupProgressBar();

});
