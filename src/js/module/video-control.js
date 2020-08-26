class VideoControlClass {
  constructor(el, video, type, time) {
    this.btnEl = el;
    this.videoEl = video;
    this.type = type;
    this.time = time;
  }
  init() {
    this.setClickHandler();
  }
  videoMove() {
    this.videoEl.currentTime = this.time;
    this.videoEl.play();
  }
  videoAdvance() {
    this.videoEl.currentTime += this.time;
    this.videoEl.play();
  }
  videoBack() {
    this.videoEl.currentTime -= this.time;
    this.videoEl.play();
  }
  setClickHandler() {
    const self = this;
    this.btnEl.addEventListener('click', e => {
      if(this.type === 'move') {
        self.videoMove();
      } else if(this.type === 'advance') {
        self.videoAdvance();
      } else if(this.type === 'back') {
        self.videoBack();
      }
    });
  }
}

export function videoControlScript() {
  // 要素の設定
  const video = document.getElementById('js-lecture-video');
  const btn1 = document.getElementById('js-lecture-btn1');
  const btn2 = document.getElementById('js-lecture-btn2');
  const btn3 = document.getElementById('js-lecture-btn3');
  const btn4 = document.getElementById('js-lecture-btn4');
  // 「最初に戻る」ボタンの初期化
  const control1 = new VideoControlClass(btn1, video, 'move', 0);
  control1.init();
  // 「12秒に移動」ボタンの初期化
  const control2 = new VideoControlClass(btn2, video, 'move', 12);
  control2.init();
  // 「10秒戻る」ボタンの初期化
  const control3 = new VideoControlClass(btn3, video, 'back', 10);
  control3.init();
  // 「10秒進む」ボタンの初期化
  const control4 = new VideoControlClass(btn4, video, 'advance', 10);
  control4.init();
}
