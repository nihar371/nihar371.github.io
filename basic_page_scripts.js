document.addEventListener("DOMContentLoaded", () => {
  // Set body padding directly, which is more common than using setAttribute for styles.
  document.body.style.padding = "0";

  // Select the main element once to avoid redundant queries.
  const mainElement = document.querySelector('main');

  // If the main element doesn't exist, log an error and stop execution.
  if (!mainElement) {
    console.error("'main' element not found. Header and nav could not be loaded.");
    return;
  }

  /**
   * Injects the header HTML (profile and music player) and initializes the player.
   */
  function loadHeader() {
    const headerHTML = `
      <div class="header">
        <div class="profile-container">
          <!-- Circular Profile Image -->
          <div class="profile-image">
            <img src="/assets/images/profile/my-profile-image.jpg" alt="Your Name">
          </div>
          <!-- Intro and Buttons -->
          <div class="intro">
            <h1>Nihar Patel</h1>
            <p>Machine Learning Engineer | Building intelligent systems to solve real-world problems.</p>
            <div class="social-buttons-grid">
              <a href="mailto:niharjpatel372001@gmail.com" class="social-button"><img src="/assets/images/icons/mail-logo.png" alt="mailto:niharjpatel372001@gmail.com"></a>
              <a href="https://github.com/nihar371" target="_blank" class="social-button"><img src="/assets/images/icons/github-logo.png" alt="GitHub:nihar371"></a>
              <a href="https://www.linkedin.com/in/niharpatel371/" target="_blank" class="social-button"><img src="/assets/images/icons/linkedin-logo.png" alt="LinkedIn:niharpatel371"></a>
              <a href="https://nihar-patel.medium.com/" target="_blank" class="social-button"><img src="/assets/images/icons/medium-logo.png" alt="Medium:nihar-patel"></a>
              <a href="https://www.kaggle.com/niharpatel03" target="_blank" class="social-button"><img src="/assets/images/icons/kaggle-logo.png" alt="Kaggle:niharpatel03"></a>
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
              <span id="currTime">00:00</span>
              <span id="durTime">00:00</span>
            </div>
          </div>
          <audio src="" id="audio"></audio>
          <div class="navigation">
            <button id="prev" class="action-btn">
              <img src="/assets/images/music_icons/backward-full.svg" alt="Previous">
            </button>
            <button id="play" class="action-btn action-btn-big">
              <img id="play-icon" src="/assets/images/music_icons/play-full.svg" alt="Play">
            </button>
            <button id="next" class="action-btn">
              <img src="/assets/images/music_icons/forward-full.svg" alt="Next">
            </button>
          </div>
        </div>
      </div>
    `;
    mainElement.insertAdjacentHTML("beforebegin", headerHTML);
    initializeMusicPlayer(); // Initialize player after its HTML is injected.
  }

  /**
   * Injects the navigation buttons into the page.
   */
  function loadNav() {
    const navHTML = `
      <div class="nav-grid">
        <div class="page-nav-button" id="about-button" aria-label="View About Section"><a href="/index.html"><span>About</span></a></div>
        <div class="page-nav-button" id="project-button" aria-label="View Project Section"><a href="/project.html"><span>Project</span></a></div>
        <div class="page-nav-button" id="blog-button" aria-label="View Blog Section"><a href="/blog.html"><span>Blog</span></a></div>
      </div>`;
    mainElement.insertAdjacentHTML("afterbegin", navHTML);
  }

  /**
   * Sets up the scroll progress bar functionality.
   */
  function setupProgressBar() {
    const progressBar = document.getElementById("bar");
    if (!progressBar) return; // Exit if progress bar element doesn't exist

    window.onscroll = () => {
      const scroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scroll / height) * 100;
      progressBar.style.width = `${scrolled}%`;
    };
  }

  /**
   * Contains all logic and event listeners for the music player.
   */
  function initializeMusicPlayer() {
    const musicContainer = document.getElementById('music-container');
    if (!musicContainer) return;

    // Select all necessary music player elements
    const playBtn = document.getElementById('play');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const playIcon = document.getElementById('play-icon');
    const audio = document.getElementById('audio');
    const progress = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-container');
    const title = document.getElementById('title');
    const cover = document.getElementById('cover');
    const currTimeSpan = document.getElementById('currTime');
    const durTimeSpan = document.getElementById('durTime');

    // Song configuration
    const songs = ['Heart_Attack', 'kyoto', 'Stoned_And_Sedated', 'My_Songs_Know_What_You_Did_In_The_Dark'];
    const audioFolderPath = '/assets/music/audio/';
    const thumbnailFolderPath = '/assets/music/thumbnail/';
    let songIndex = 0;

    // --- Core Player Functions ---

    function loadSong(song) {
      title.textContent = song.replace(/_|-/g, ' ');
      audio.src = `${audioFolderPath}${song}.mp3`;
      cover.src = `${thumbnailFolderPath}${song}.webp`;
    }

    function playSong() {
      musicContainer.classList.add('play');
      playIcon.src = '/assets/images/music_icons/pause-full.svg';
      playIcon.alt = 'Pause';
      audio.play();
    }

    function pauseSong() {
      musicContainer.classList.remove('play');
      playIcon.src = '/assets/images/music_icons/play-full.svg';
      playIcon.alt = 'Play';
      audio.pause();
    }

    function prevSong() {
      songIndex = (songIndex - 1 + songs.length) % songs.length;
      loadSong(songs[songIndex]);
      playSong();
    }

    function nextSong() {
      songIndex = (songIndex + 1) % songs.length;
      loadSong(songs[songIndex]);
      playSong();
    }

    function updateProgress(e) {
      const { duration, currentTime } = e.srcElement;
      if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currTimeSpan.textContent = formatTime(currentTime);
      }
    }

    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
    }
    
    function setDuration() {
        if(audio.duration){
            durTimeSpan.textContent = formatTime(audio.duration);
        }
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    // --- Attach Event Listeners ---

    playBtn.addEventListener('click', () => {
      const isPlaying = musicContainer.classList.contains('play');
      isPlaying ? pauseSong() : playSong();
    });

    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', setDuration);
    audio.addEventListener('ended', nextSong);
    progressContainer.addEventListener('click', setProgress);

    // Initialize player with the first song
    loadSong(songs[songIndex]);
  }

  // --- Run Initialization Functions ---
  loadHeader();
  loadNav();
  setupProgressBar();
});