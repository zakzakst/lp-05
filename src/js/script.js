import { pageLoaderScript } from './module/page-loader';
import { heroScript } from './module/hero';
import { featureScript } from './module/feature';
import { videoBnrScript } from './module/video-bnr';
import { videoBnrYouTubeScript } from './module/video-bnr-youtube';
import { videoModalScript } from './module/video-modal';
import { videoModalYoutubeScript } from './module/video-modal-youtube';
import { videoControlScript } from './module/video-control';
import { videoControlYoutubeScript } from './module/video-control-youtube';

(function() {
  // ページローダー
  pageLoaderScript();
  // ヒーローセクション
  heroScript();
  // 特徴セクション
  featureScript();
  // ビデオバナー：通常
  videoBnrScript();
  // ビデオバナー：YouTube
  videoBnrYouTubeScript();
  // ビデオモーダル：通常
  videoModalScript();
  // ビデオモーダル：YouTube
  videoModalYoutubeScript();
  // ビデオ操作
  videoControlScript();
  // ビデオ操作：YouTube
  videoControlYoutubeScript();
})();
