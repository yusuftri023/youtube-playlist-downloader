const { google } = require("googleapis");
const youtubeAPI = google.youtube("v3");
require("dotenv").config();
const { GOOGLE_API } = process.env;
function playlistDownload(playlistId) {
  youtubeAPI.playlistItems.list(
    {
      key: GOOGLE_API,
      part: "id,snippet",
      playlistId: playlistId,
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
