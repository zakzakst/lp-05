import YouTubePlayer from 'youtube-player';

export class VideoModalYoutube {
  constructor(buttonElId, playerId) {
    this.btnEl = document.getElementById(buttonElId);
    this.playerId = playerId;
    const targetId = this.btnEl.dataset.videoModalYoutubeTarget;
    this.el = document.getElementById(targetId);
    this.closeEl = this.el.querySelector('.video-modal-youtube__close');
    this.overlayEl = this.el.querySelector('.video-modal-youtube__overlay');
  }
  init() {
    this.initYouTubePlayer();
    this.showVideoHandler();
    this.closeVideoHandler();
  }
  initYouTubePlayer() {
    // YouTube初期化
    const ytConfig = {
      videoId: this.el.dataset.ytVideoId,
      // width: this.el.dataset.ytWidth,
      // height: this.el.dataset.ytHeight,
    };
    this.player = YouTubePlayer(this.playerId, ytConfig);
  }
  showVideo() {
    this.el.classList.add('is-active');
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
    this.el.classList.remove('is-active');
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
