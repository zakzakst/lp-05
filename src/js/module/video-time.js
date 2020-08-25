class VideoTime {
  constructor() {
    this.videoEl = document.getElementById('js-video-time-video');
    this.btnList = document.querySelectorAll('.js-video-time-btn');
  }
  init() {
    this.startVideoHandler();
  }
  startVideo(time) {
    this.videoEl.currentTime = time;
    this.videoEl.play();
  }
  startVideoHandler() {
    [...this.btnList].forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        const time = e.target.dataset.videoTime;
        this.startVideo(time);
      });
    });
  }
}

export function videoTimeScript() {
  const videoTime = new VideoTime();
  videoTime.init();
}
