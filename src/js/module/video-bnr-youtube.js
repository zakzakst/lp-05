import YouTubePlayer from 'youtube-player';

export class VideoBnrYoutube {
  constructor(elId, playerId) {
    this.el = document.getElementById(elId);
    this.playerId = playerId;
    this.overlayEl = this.el.querySelector('.video-bnr-youtube__overlay');
    this.btnEl = this.el.querySelector('.video-bnr-youtube__btn');
  }
  init() {
    this.initYouTubePlayer();
    this.startVideoHandler();
  }
  initYouTubePlayer() {
    // YouTube初期化
    const ytConfig = {
      videoId: this.el.dataset.ytVideoId,
      width: this.el.dataset.ytWidth,
      height: this.el.dataset.ytHeight,
    };
    this.player = YouTubePlayer(this.playerId, ytConfig);
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
