const youtube = require("youtubei.js");
const fs = require("fs");
// jalankan di console browser di page playlist
// var els = document.getElementsByClassName(
//   "yt-simple-endpoint style-scope ytd-playlist-video-renderer"
// );
// var show = "";
// for (i = 0; i < els.length; i++) {
//   var el = els[i];
//   show += el.href.split("?v=")[1].split("&list")[0] + "\n";
// }
// console.log(show.split("\n"));
const listvideo = [
  "coqQwbDezUA",
  "vVYG8TNN7hg",
  "Fo2Qnw5pMGo",
  "3yUuo7TqMW8",
  "XkhLTlFXxbI",
  "Eivk4lyC00E",
  "tQjd29Rmo_A",
  "vAgzuS3u6W0",
  "cbHMQxOuIUw",
  "SZRG1bmDlx8",
  "Oz4Y4psjG7w",
  "wZNxLwqxu00",
  "o5XweHW-H4Y",
  "jktVSpNwVT8",
  "EvRdNdOfRl8",
  "oVj5ZvZd-cU",
  "75jGy1xAhhs",
  "EFXWgZJZqL8",
  "DOB7YVH2SZo",
  "gqMjdM8FsrE",
  "xdCgW2a3r_Q",
  "Wu_mDUIsTVE",
  "OxUF23k7IcM",
  "ceqwscS_muA",
  "lWLTHsQnHDI",
  "qInXNtKaf4Q",
  "wXZyuJqNk9U",
  "x3rkUQcfFww",
  "C2HuBFYgyM8",
  "XPpnW-WsDmQ",
  "jrY7eONLHZs",
  "ezWDYotcuek",
  "_dt773ImwFw",
  "bLHxrvDvL_8",
  "tCvSDnRsGnw",
  "poGEVboh9Rw",
  "txjmvEPlAtU",
  "1c9CArj66mU",
  "vfPd6_H7W4Q",
  "XOpKmpRh69Y",
  "a1fyufVlLmk",
  "ex8EHl5fq1o",
  "NuBWJ7kIlDg",
  "ba15sgOiAOg",
  "ngNJps_RUg8",
  "oIR_DOOOACk",
  "3OsxH-huRc4",
  "Tggvw4QlA9U",
  "NAPQ0ua02CA",
  "A-9tzPuE1eA",
  "3e6Xfnr5ME8",
  "Sd9Nps5nAdU",
  "D_kWagEfcx8",
  "RgrIXX3E2mY",
  "ZRIJuAIGJ4M",
  "S9kMVEUg-x4",
  "sw7fCZeFTdc",
  "ADZfDxftXQ0",
  "-0ZIresFUZI",
  "15q-fLZqo_0",
  "MZhQB8R33xw",
  "-Df9ipREbuM",
  "y3CcHKEM8r8",
  "kTh5nAqCkOA",
  "c-LEpmYikFY",
  "-ZMm8xX-Vrs",
  "kIVkBsfB-SM",
  "zOgsIjM-a7g",
  "lml2E9SIJHo",
  "n6_Ruq1qvjU",
  "H0i3gk1h0lI",
  "mrzE5SqzoQY",
  "80GhW9X1MGI",
  "bLtm94mvfjE",
  "Gqwt45cHyoQ",
  "O7BtCGkkPBY",
  "Yy7T4bLhqUg",
  "TQ1LlaRHaow",
  "75JAn8ejI_I",
  "kRYZmOZDlY0",
];
async function downloading() {
  const yt = await youtube.Innertube.create({
    cache: new youtube.UniversalCache(false),
    generate_session_locally: true,
  });

  for (video of listvideo) {
    const download = await yt.download(video, {
      type: "video",
      quality: "best",
      format: "mp4",
    });
    const infoVideo = await yt.getBasicInfo(video);

    if (!download) {
      throw new Error("failed to download");
    }
    const title = infoVideo.basic_info.title;
    const replace = title.replace(/[?]/g, "");
    const createFile = fs.createWriteStream(
      `D:/folder_backup_20-10-2023/Pelatihan_Binar_Academy/video_DSA/${replace}.mp4`
    );
    for await (const chunk of youtube.Utils.streamToIterable(download)) {
      createFile.write(chunk);
    }
  }
  console.log("All files successfully downloaded");
}
downloading();
