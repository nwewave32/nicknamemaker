const ShareUtil = () => {
  const shareNaver = (nowUrl) => {
    var url = encodeURI(encodeURIComponent(nowUrl));
    var title = encodeURI("nicknamemaker");
    var shareURL =
      "https://share.naver.com/web/shareView?url=" + url + "&title=" + title;
    // document.location = shareURL;
    window.open(shareURL);
  };

  const shareTwitter = (nowUrl) => {
    var sendText = "nicknamemaker"; // 전달할 텍스트
    var sendUrl = nowUrl; // 전달할 URL
    window.open(
      "https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl
    );
  };
  const shareFacebook = (nowUrl) => {
    var sendUrl = nowUrl; // 전달할 URL
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl);
  };

  const shareUrl = (nowUrl) => {
    return navigator.clipboard.writeText(nowUrl);
  };
  const shareKakao = (nowUrl) => {
    if (window.Kakao) {
      const kakao = window.Kakao;

      if (!kakao.isInitialized()) {
        kakao.init("6a77410711b1e4eb486173aa1419cb49");
      }

      kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "nicknamemaker",
          description: "이름짓기",
          imageUrl: "images/icons/window_logo.png",
          link: {
            // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
            mobileWebUrl: nowUrl,
            webUrl: nowUrl,
          },
        },
        social: {
          likeCount: 286,
          commentCount: 45,
          sharedCount: 845,
        },
        buttons: [
          {
            title: "웹으로 보기",
            link: {
              mobileWebUrl: nowUrl,
              webUrl: nowUrl,
            },
          },
        ],
      });
    }
  };

  return {
    shareNaver: shareNaver,
    shareTwitter: shareTwitter,
    shareFacebook: shareFacebook,
    shareUrl: shareUrl,
    shareKakao: shareKakao,
  };
};

const shareUtil = ShareUtil();
export { shareUtil };
