import YouTubePlayer from 'youtube-player';

class VideoControlYoutubeClass {
  constructor(id) {
    this.id = id;
    this.el = document.getElementById(id);
  }
  init() {
    // YouTube初期化
    const ytConfig = {
      videoId: this.el.dataset.ytVideoId,
      width: this.el.dataset.ytWidth,
      height: this.el.dataset.ytHeight,
    };
    this.player = YouTubePlayer(this.id, ytConfig);
  }
  videoMove(time) {
    this.player.seekTo(time);
  }
  videoAdvance(time) {
    this.player.getCurrentTime().then(res => {
      this.player.seekTo(res + time);
    });
  }
  videoBack(time) {
    this.player.getCurrentTime().then(res => {
      this.player.seekTo(res - time);
    });
  }
}

export function videoControlYoutubeScript() {
  // YouTube初期化
  const video = new VideoControlYoutubeClass('js-lecture-video-youtube');
  video.init();
  // 要素の設定
  const btn1 = document.getElementById('js-lecture-youtube-btn1');
  const btn2 = document.getElementById('js-lecture-youtube-btn2');
  const btn3 = document.getElementById('js-lecture-youtube-btn3');
  const btn4 = document.getElementById('js-lecture-youtube-btn4');
  // 「最初に戻る」ボタンの初期化
  btn1.addEventListener('click', () => {
    video.videoMove(0);
  });
  // 「12秒に移動」ボタンの初期化
  btn2.addEventListener('click', () => {
    video.videoMove(12);
  });
  // 「10秒戻る」ボタンの初期化
  btn3.addEventListener('click', () => {
    video.videoBack(10);
  });
  // 「10秒進む」ボタンの初期化
  btn4.addEventListener('click', () => {
    video.videoAdvance(10);
  });
}
