require("dotenv").config();
const fs = require("fs");
const youtube = require("youtubei.js");
const { google } = require("googleapis");
const youtubeAPI = google.youtube("v3");
const { GOOGLE_API } = process.env;

const saveLocation =
  "D:/folder_backup_20-10-2023/Pelatihan_Binar_Academy/testingtesting";

function singleDownload(videoId) {
  const list = [videoId];
  downloading(list);
}

async function playlistDownload(playlistId, pageToken = "", list = []) {
  youtubeAPI.playlistItems.list(
    {
      key: GOOGLE_API,
      part: "id,snippet",
      playlistId: playlistId,
      pageToken: pageToken,
      maxResults: 50,
    },
    (err, results) => {
      if (err) console.log(err.message);
      for (let i = 0; i < results.data.items.length; i++) {
        list.push(results.data.items[i].snippet.resourceId.videoId);
      }
      const nextPageToken = results.data.nextPageToken;
      if (nextPageToken === undefined) {
        downloading(list);
        return;
      }
      const newlist = list;
      playlistDownload(playlistId, nextPageToken, newlist);
    }
  );
}
async function downloading(listvideo) {
  for (video of listvideo) {
    const yt = await youtube.Innertube.create({
      cache: new youtube.UniversalCache(false),
      generate_session_locally: true,
    });
    const infoVideo = await yt.getBasicInfo(video);
    const title = infoVideo.basic_info.title;
    console.log(`Begin downloading video: ${title}`);
    const downloadVideo = await yt.download(video, {
      type: "video+audio",
      quality: "best",
      format: "mp4",
    });

    if (!downloadVideo) {
      throw new Error("failed to download");
    }

    const replace = title.replace(/[?|.,/;:"']/g, "");
    if (!fs.existsSync(`${saveLocation}`)) {
      fs.mkdirSync(`${saveLocation}`);
    }
    const createFile = fs.createWriteStream(`${saveLocation}/${replace}.mp4`);
    for await (const chunk of youtube.Utils.streamToIterable(downloadVideo)) {
      createFile.write(chunk);
    }
    console.log(`Video ${title} successfully downloaded`);
  }
  console.log("All files successfully downloaded to", saveLocation);
}

function main(id) {
  try {
    if (id.length === 34) playlistDownload(id);
    else if (id.length === 11) singleDownload(id);
    else {
      throw new Error("Invalid playlist or video ID");
    }
  } catch (error) {
    console.log(error);
  }
}
main("vrF1ugfmrYo");
module.exports = { playlistDownload, singleDownload };
