import { heroScript } from './module/hero';
import { campaignScript } from './module/campaign';
import { VideoBnr } from './module/video-bnr';
import { VideoBnrYoutube } from './module/video-bnr-youtube';
import { movieGalleryScript } from './module/movie-gallery';
import { VideoModal } from './module/video-modal';
import { VideoModalYoutube } from './module/video-modal-youtube';
import { videoTimeScript } from './module/video-time';

(function() {
  heroScript();

  // キャンペーンセクション 画像パララックス
  campaignScript();
  // キャンペーンセクション 動画操作
  const videoBnr = new VideoBnr('js-video-bnr');
  videoBnr.init();
  // キャンペーンセクション YouTube操作
  const videoBnrYoutube = new VideoBnrYoutube('js-video-bnr-youtube', 'js-video-bnr-youtube-player');
  videoBnrYoutube.init();

  // 動画ギャラリーセクション バナー表示
  movieGalleryScript();
  // 動画ギャラリーセクション 動画モーダル
  const videoModal1 = new VideoModal('js-video-modal-btn1');
  videoModal1.init();
  const videoModal2 = new VideoModal('js-video-modal-btn2');
  videoModal2.init();
  // 動画ギャラリーセクション YouTubeモーダル
  const videoModalYoutube1 = new VideoModalYoutube('js-video-modal-youtube-btn1', 'js-video-modal-youtube-player1');
  videoModalYoutube1.init();
  const videoModalYoutube2 = new VideoModalYoutube('js-video-modal-youtube-btn2', 'js-video-modal-youtube-player2');
  videoModalYoutube2.init();

  // 開始時間選択
  videoTimeScript();
})();
