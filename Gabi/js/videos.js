function reloadVideo(videoId, videoSource) {
    var video = document.getElementById(videoId);
    video.src = videoSource;
    video.load();
    video.play();
}
    