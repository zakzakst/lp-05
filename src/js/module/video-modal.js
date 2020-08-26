class VideoModalClass {
  constructor(el) {
    this.btnEl = el;
    this.targetId = this.btnEl.dataset.videoModalTarget;
    this.modalEl = document.getElementById(this.targetId);
    this.videoEl = this.modalEl.querySelector('.video-modal__video');
    this.closeEl = this.modalEl.querySelector('.video-modal__close');
    this.overlayEl = this.modalEl.querySelector('.video-modal__overlay');
  }
  init() {
    this.showVideoHandler();
    this.closeVideoHandler();
  }
  showVideo() {
    this.modalEl.classList.add('is-active');
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

export function videoModalScript() {
  const modalBtns = document.querySelectorAll('.js-video-modal-btn');
  [...modalBtns].forEach(btn => {
    const modalBtn = new VideoModalClass(btn);
    modalBtn.init();
  });
}
