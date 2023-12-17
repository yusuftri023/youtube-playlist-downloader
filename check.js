const { google } = require("googleapis");
const youtubeAPI = google.youtube("v3");
function playlistDownload(playlistId) {
  youtubeAPI.playlistItems.list(
    {
      key: "AIzaSyBtAu7Xvt_JaN5xa7jPcXcLuNL0g6IZelQ",
      part: "id,snippet",
      playlistId: "PLC3y8-rFHvwjPxNAKvZpdnsr41E0fCMMP",
      pageToken: "",
      maxResults: 50,
    },
    (err, results) => {
      if (err) console.log(err.message);

      console.log(results.data.items);
    }
  );
}
playlistDownload(123);
