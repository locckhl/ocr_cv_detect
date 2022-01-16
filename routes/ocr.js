const router = require("express").Router();

// Imports the Google Cloud client libraries
const vision = require("@google-cloud/vision").v1;
const { Storage } = require("@google-cloud/storage");
const extractText = require("./extractText");

// Creates a client
const client = new vision.ImageAnnotatorClient();
const storage = new Storage();

// Bucket where the file resides
const bucketName = "itss2-32f90.appspot.com";
// Path to PDF file within bucket
const fileName = "test_ocr.png";

const detectText = async (files) => {
  // Imports the Google Cloud client libraries
  const vision = require("@google-cloud/vision");

  // Creates a client
  const client = new vision.ImageAnnotatorClient();
  let finalResult = "";

  // const getResultFromFilesPromise = files.map(async (file) => {
  //   console.log("detecting file", file);
  //   const [result] = await client.textDetection(`gs://${bucketName}/${file}`);
  //   const detections = result.textAnnotations;
  //   // console.log("Text:");
  //   // detections.forEach((text) => console.log(text));
  //   console.log("dectected text:", detections[0].description);
  //   finalResult += detections[0].description;
  // });
  // await Promise.all(getResultFromFilesPromise);

  for (let promise of files.map(
    (file) => () =>
      new Promise((resolve, reject) => {
        try {
          console.log("detecting file", file);

          resolve(client.textDetection(`gs://${bucketName}/${file}`));
        } catch (error) {
          reject(error);
        }
      })
  )) {
    const [result] = await promise();
    const detections = result.textAnnotations;
    // console.log("Text:");
    // detections.forEach((text) => console.log(text));
    console.log("dectected text:", detections[0].description);
    finalResult += detections[0].description;
    console.log("finalResult", finalResult);
  }

  return finalResult;
};

const tempData =
  "履歷書 2020年 05 月 03 日現在 ふりがな チャン·アイン·トゥアン-番号:12 图,女 氏 名 TRAN ANΗ TUAN 生年月日 1999 年 05 月16日生 満(21)歳 ふりがな 47/76、ヴ·シュアン·ティエウ、ロング·ビエン·ハノイ (自宅電話) 現住所 No 47/76, Vu Xuan Thieu, Long Bien, Hanoi (携帯電話) E-mail trananhtuan12a10@gmail.com +84 0981524316 ふりがな (連絡先電話) 連絡先 ";

router.get("/", async (req, res) => {
  try {
    const files = req.query.files.split(",");

    const text = await detectText(files);
    const data = await extractText(text);
    res.status(201).json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

module.exports = router;
