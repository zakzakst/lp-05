export class VideoModal {
  constructor(buttonElId) {
    this.btnEl = document.getElementById(buttonElId);
    const targetId = this.btnEl.dataset.videoModalTarget;
    this.el = document.getElementById(targetId);
    this.videoEl = this.el.querySelector('.video-modal__video');
    this.closeEl = this.el.querySelector('.video-modal__close');
    this.overlayEl = this.el.querySelector('.video-modal__overlay');
  }
  init() {
    this.showVideoHandler();
    this.closeVideoHandler();
  }
  showVideo() {
    this.el.classList.add('is-active');
    this.videoEl.play();
  }
  showVideoHandler() {
    this.btnEl.addEventListener('click', e => {
      e.preventDefault();
      this.showVideo();
    });
  }
  closeVideo() {
    this.videoEl.pause();
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
