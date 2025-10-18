document.addEventListener("DOMContentLoaded", () => {
  document.body.style.padding = "0";
  const mainElement = document.querySelector('main');

  if (!mainElement) {
    console.error("'main' element not found. `header`, `nav`, and `progress-bar` could not be loaded.");
    return;
  }

  /**
   * Injects the header HTML and initializes the player.
   */
  function loadHeader() {
    const headerHTML = `
      <div class="header">
        <div class="profile-container">
          <div class="profile-image">
            <img src="/assets/images/profile/my-profile-image.jpg" alt="Your Name">
          </div>
          <div class="intro">
            <h1>Nihar Patel</h1>
            <p>Data Scientist</p>
            <div class="social-buttons-grid">
              <a href="mailto:niharjpatel372001@gmail.com" class="social-button"><img src="/assets/images/icons/mail-logo.png" alt="Email"></a>
              <a href="https://github.com/nihar371" target="_blank" class="social-button"><img src="/assets/images/icons/github-logo.png" alt="GitHub"></a>
              <a href="https://www.linkedin.com/in/niharpatel371/" target="_blank" class="social-button"><img src="/assets/images/icons/linkedin-logo.png" alt="LinkedIn"></a>
              <a href="https://nihar-patel.medium.com/" target="_blank" class="social-button"><img src="/assets/images/icons/medium-logo.png" alt="Medium"></a>
              <a href="https://www.kaggle.com/niharpatel03" target="_blank" class="social-button"><img src="/assets/images/icons/kaggle-logo.png" alt="Kaggle"></a>
            </div>
          </div>
        </div>
        
        <div class="music-container" id="music-container">
          <div class="img-container">
            <img src="" alt="music-cover" id="cover">
          </div>
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
    initializeMusicPlayer();
  }

  function loadFooter() {
    const footerHTML = `
      <div class="footer">
        <div class="footer-content">
          <p>Made with ❤️ - Nihar</p>
        </div>
      </div>
    `;
    mainElement.insertAdjacentHTML("afterend", footerHTML);
  }

  function scrollToTopButton() {
    const scrollButtonHTML = `
      <button id="scrollToTopBtn" aria-label="Scroll to top">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up">
          <line x1="12" y1="19" x2="12" y2="5"></line>
          <polyline points="5 12 12 5 19 12"></polyline>
        </svg>
      </button>
    `;
    mainElement.insertAdjacentHTML("afterend", scrollButtonHTML);

    const scrollBtn = document.getElementById('scrollToTopBtn');

    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
      // You can adjust this value to change when the button appears
      const scrollThreshold = 300;
      if (window.scrollY > scrollThreshold) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });

    // Scroll to the top of the page smoothly when the button is clicked
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /**
   * Injects the navigation buttons into the page.
   */
  function loadNav() {
    const navHTML = `
      <div class="nav-grid">
        <div class="page-nav-button" id="home-button" aria-label="View Landing Page"><a href="/"><span>Home</span></a></div>
        <div class="page-nav-button" id="blog-button" aria-label="View Blog Section"><a href="/blog/"><span>Blog</span></a></div>
        <div class="page-nav-button" id="project-button" aria-label="View Project Section"><a href="/project/"><span>Project</span></a></div>
        <div class="page-nav-button" id="about-button" aria-label="View About Section"><a href="/about/"><span>About</span></a></div>
      </div>


      <div class="scrollbar-container">
        <div class="scrollbar-track">
          <div class="scrollbar-thumb"></div>
        </div>
      </div>`;
    mainElement.insertAdjacentHTML("beforebegin", navHTML);
  }

  /**
   * Sets up the scroll progress bar functionality.
   */
  function setupProgressBar() {
    const progressBarHTML = `<div id="bar"></div>`;
    mainElement.insertAdjacentHTML("beforebegin", progressBarHTML);

    const progressBar = document.getElementById("bar");
    if (!progressBar) return;

    window.onscroll = () => {
      const scroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (scroll / height) * 100;
      progressBar.style.width = `${scrolled}%`;
    };
  }

  /**
   * Makes the music player stick to the top by moving it in the DOM.
   */
  function setupStickyPlayer() {
    const header = document.querySelector('.header');
    const musicContainer = document.getElementById('music-container');
    if (!header || !musicContainer) return;

    const placeholder = document.createElement('div');
    const musicStyle = window.getComputedStyle(musicContainer);
    placeholder.style.height = `${musicContainer.offsetHeight}px`;
    placeholder.style.marginTop = musicStyle.marginTop;
    placeholder.style.marginBottom = musicStyle.marginBottom;
    let musicContainerWidth = window.getComputedStyle(musicContainer).getPropertyValue('width')

    const stickyPoint = musicContainer.offsetTop;
    let isPlayerFixed = false;
    window.addEventListener('scroll', () => {

      const shouldBeFixed = window.scrollY > stickyPoint - parseInt(musicStyle.marginTop, 10);

      if (shouldBeFixed && !isPlayerFixed) {
        isPlayerFixed = true;

        // Add class for styling like width, shadow, etc.
        musicContainer.classList.add('music-container-fixed');

        // **Force position via JS to override any potential CSS conflicts**
        musicContainer.style.position = 'fixed';
        musicContainer.style.top = '0';
        musicContainer.style.left = '0';
        musicContainer.style.right = '0';

        // Replace player with placeholder and move player to the body
        header.replaceChild(placeholder, musicContainer);
        document.body.appendChild(musicContainer);
        musicContainer.style.width = musicContainerWidth;

      } else if (!shouldBeFixed && isPlayerFixed) {
        isPlayerFixed = false;

        musicContainer.classList.remove('music-container-fixed');

        // **Clear inline styles to revert to stylesheet behavior**
        musicContainer.style.position = '';
        musicContainer.style.top = '';
        musicContainer.style.left = '';
        musicContainer.style.zIndex = '';

        // Move player back into the header
        header.replaceChild(musicContainer, placeholder);
        musicContainer.style.width = musicContainerWidth;
      }
    });
  }


  /**
   * Contains all logic and event listeners for the music player.
   */
  function initializeMusicPlayer() {
    const musicContainer = document.getElementById('music-container');
    if (!musicContainer) return;

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

    const songs = ['Heart_Attack', 'kyoto', 'Stoned_And_Sedated', 'My_Songs_Know_What_You_Did_In_The_Dark'];
    const audioFolderPath = '/assets/music/audio/';
    const thumbnailFolderPath = '/assets/music/thumbnail/';
    let songIndex = 0;

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
      if (audio.duration) {
        durTimeSpan.textContent = formatTime(audio.duration);
      }
    }

    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

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

    loadSong(songs[songIndex]);
  }

  // --- Run Initialization Functions ---
  loadHeader();
  loadFooter();
  loadNav();
  scrollToTopButton();
  setupProgressBar();
  setupStickyPlayer();
});


































// document.addEventListener('DOMContentLoaded', () => {

//   // --- 1. ELEMENT SELECTION ---
//   const scrollbarTrack = document.querySelector('.scrollbar-track');
//   const scrollbarThumb = document.querySelector('.scrollbar-thumb');
//   const scrollOriginIcon = document.getElementById('scroll-origin-icon');

//   // --- 2. STATE VARIABLES ---
//   let isThumbDragging = false;
//   let isMiddleClickScrolling = false;
//   let startMouseY, startScrollTop;
//   let middleClickStartY;

//   // --- 3. CORE SCROLLBAR LOGIC ---
//   function updateScrollbar() {
//     const viewportHeight = window.innerHeight;
//     const contentHeight = document.body.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;

//     if (contentHeight <= viewportHeight) {
//       scrollbarTrack.style.display = 'none';
//       return;
//     }
//     scrollbarTrack.style.display = 'block';

//     const thumbHeight = (viewportHeight / contentHeight) * viewportHeight;
//     scrollbarThumb.style.height = `${Math.max(thumbHeight, 20)}px`; // Minimum thumb height

//     const maxThumbPosition = viewportHeight - scrollbarThumb.offsetHeight;
//     const maxScrollableHeight = contentHeight - viewportHeight;
//     const thumbPosition = (scrollTop / maxScrollableHeight) * maxThumbPosition;
//     scrollbarThumb.style.transform = `translateY(${thumbPosition}px)`;
//   }

//   // --- 4. SCROLL TO TOP BUTTON LOGIC ---
//   function toggleScrollToTopButton() {
//     if (document.documentElement.scrollTop > 300) {
//       scrollToTopBtn.classList.add('show');
//     } else {
//       scrollToTopBtn.classList.remove('show');
//     }
//   }

//   scrollToTopBtn.addEventListener('click', () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   });

//   // --- 5. EVENT LISTENERS ---

//   // Initial updates and on window events
//   window.addEventListener('resize', updateScrollbar);
//   window.addEventListener('scroll', () => {
//     // We only update on scroll if the user isn't actively dragging the thumb
//     if (!isThumbDragging) {
//       updateScrollbar();
//     }
//     toggleScrollToTopButton();
//   });

//   // A. Thumb Dragging Logic
//   scrollbarThumb.addEventListener('mousedown', (e) => {
//     e.stopPropagation(); // Prevent track click event from firing
//     isThumbDragging = true;
//     startMouseY = e.clientY;
//     startScrollTop = document.documentElement.scrollTop;
//     document.body.classList.add('dragging');
//   });

//   // B. Track Click Logic
//   scrollbarTrack.addEventListener('click', (e) => {
//     if (e.target === scrollbarTrack) {
//       const viewportHeight = window.innerHeight;
//       const contentHeight = document.body.scrollHeight;
//       const maxScrollableHeight = contentHeight - viewportHeight;

//       const clickY = e.clientY;
//       const thumbHeight = scrollbarThumb.offsetHeight;
//       const maxThumbPosition = viewportHeight - thumbHeight;

//       const newThumbPosition = clickY - (thumbHeight / 2);
//       const scrollRatio = newThumbPosition / maxThumbPosition;
//       const newScrollTop = scrollRatio * maxScrollableHeight;

//       window.scrollTo({ top: newScrollTop }); // 'smooth' behavior is handled by html{scroll-behavior}
//     }
//   });

//   // C. General Mouse and Keyboard Listeners (on document/window)
//   document.addEventListener('mouseup', () => {
//     isThumbDragging = false;
//     document.body.classList.remove('dragging');

//     if (isMiddleClickScrolling) {
//       isMiddleClickScrolling = false;
//       scrollOriginIcon.style.display = 'none';
//     }
//   });

//   document.addEventListener('mousemove', (e) => {
//     if (isThumbDragging) {
//       const dy = e.clientY - startMouseY;
//       const viewportHeight = window.innerHeight;
//       const contentHeight = document.body.scrollHeight;
//       const maxScrollableHeight = contentHeight - viewportHeight;
//       const maxThumbPosition = viewportHeight - scrollbarThumb.offsetHeight;

//       const scrollRatio = maxScrollableHeight / maxThumbPosition;
//       const newScrollTop = startScrollTop + (dy * scrollRatio);

//       document.documentElement.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollableHeight));
//       updateScrollbar(); // Manually update while dragging
//     }

//     if (isMiddleClickScrolling) {
//       const deltaY = e.clientY - middleClickStartY;
//       // The scroll speed can be adjusted by changing the multiplier
//       const scrollSpeed = 0.8;
//       window.scrollBy(0, deltaY * scrollSpeed);
//       // We reset the start Y to the current position for continuous, smooth scrolling
//       middleClickStartY = e.clientY;
//     }
//   });

//   // D. Keyboard Navigation (PageUp/PageDown)
//   window.addEventListener('keydown', (e) => {
//     const viewportHeight = window.innerHeight;
//     if (e.key === 'PageDown') {
//       e.preventDefault();
//       window.scrollBy({ top: viewportHeight * 0.9, behavior: 'smooth' });
//     } else if (e.key === 'PageUp') {
//       e.preventDefault();
//       window.scrollBy({ top: -viewportHeight * 0.9, behavior: 'smooth' });
//     }
//   });

//   // E. Middle-Click (Scroll Button) Logic
//   window.addEventListener('mousedown', (e) => {
//     // e.button === 1 is the middle mouse button
//     if (e.button === 1) {
//       e.preventDefault();
//       isMiddleClickScrolling = true;
//       middleClickStartY = e.clientY;

//       scrollOriginIcon.style.top = `${e.clientY}px`;
//       scrollOriginIcon.style.left = `${e.clientX}px`;
//       scrollOriginIcon.style.display = 'block';
//     }
//   });

//   // --- 6. INITIALIZATION ---
//   updateScrollbar();
//   toggleScrollToTopButton();
// });