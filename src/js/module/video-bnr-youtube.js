import YouTubePlayer from 'youtube-player';

class VideoBnrYoutubeClass {
  constructor(el) {
    this.el = el;
    this.overlayEl = this.el.querySelector('.video-bnr-youtube__overlay');
    this.btnEl = this.el.querySelector('.video-bnr-youtube__btn');
  }
  init() {
    this.initYouTubePlayer();
    this.startVideoHandler();
  }
  initYouTubePlayer() {
    // YouTube初期化
    const playerId = this.el.dataset.ytVideoPlayer;
    const ytConfig = {
      videoId: this.el.dataset.ytVideoId,
      width: this.el.dataset.ytWidth,
      height: this.el.dataset.ytHeight,
    };
    this.player = YouTubePlayer(playerId, ytConfig);
  }
  startVideo() {
    this.overlayEl.style.display = 'none';
    this.player.playVideo();
  }
  startVideoHandler() {
    this.btnEl.addEventListener('click', e => {
      e.preventDefault();
      this.startVideo();
    });
  }
}

export function videoBnrYouTubeScript() {
  const videoBnrYoutubeItems = document.querySelectorAll('.js-video-bnr-youtube');
  [...videoBnrYoutubeItems].forEach(el => {
    const videoBnrYoutube = new VideoBnrYoutubeClass(el);
    videoBnrYoutube.init();
  });
}
