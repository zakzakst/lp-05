import YouTubePlayer from 'youtube-player';

class VideoModalYoutubeClass {
  constructor(el) {
    this.btnEl = el;
    const targetId = this.btnEl.dataset.videoModalYoutubeTarget;
    this.modalEl = document.getElementById(targetId);
    this.closeEl = this.modalEl.querySelector('.video-modal-youtube__close');
    this.overlayEl = this.modalEl.querySelector('.video-modal-youtube__overlay');
  }
  init() {
    this.initYouTubePlayer();
    this.showVideoHandler();
    this.closeVideoHandler();
  }
  initYouTubePlayer() {
    // YouTube初期化
    const playerId = this.modalEl.dataset.ytPlayerId;
    const ytConfig = {
      videoId: this.modalEl.dataset.ytVideoId,
      // width: this.el.dataset.ytWidth,
      // height: this.el.dataset.ytHeight,
    };
    this.player = YouTubePlayer(playerId, ytConfig);
  }
  showVideo() {
    this.modalEl.classList.add('is-active');
    this.player.playVideo();
  }
  showVideoHandler() {
    this.btnEl.addEventListener('click', e => {
      e.preventDefault();
      this.showVideo();
    });
  }
  closeVideo() {
    this.player.pauseVideo();
    this.modalEl.classList.remove('is-active');
  }
  closeVideoHandler() {
    [this.closeEl, this.overlayEl].forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        this.closeVideo();
      });
    });
  }
}

export function videoModalYoutubeScript() {
  const modalBtns = document.querySelectorAll('.js-video-modal-youtube-btn');
  [...modalBtns].forEach(btn => {
    const modalBtn = new VideoModalYoutubeClass(btn);
    modalBtn.init();
  });
}
