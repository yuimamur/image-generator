//npm init -y
//npm install axios
//node image-generate.js

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Pixabay APIキーを設定
const PIXABAY_API_KEY = 'MY API Key';

// 猫の画像を検索するためのパラメータ
const searchQuery = 'cat';
const imageType = 'photo';
const perPage = 30;

// Pixabay APIから画像を取得する関数
async function getCatImages(apiKey, query, type, page) {
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=${type}&per_page=${page}`;
  const response = await axios.get(apiUrl);
  return response.data.hits;
}

// 画像をダウンロードする関数
async function downloadImages(images, outputFolder) {
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }

  for (let i = 0; i < images.length; i++) {
    const imageUrl = images[i].webformatURL;
    const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imagePath = path.join(outputFolder, `cat_${i + 1}.jpg`);
    fs.writeFileSync(imagePath, imageResponse.data);
  }
}

// Pixabay APIから猫の画像を取得
getCatImages(PIXABAY_API_KEY, searchQuery, imageType, perPage)
  .then((catImages) => {
    // 画像をダウンロード
    const outputFolder = 'cat_images';
    downloadImages(catImages, outputFolder);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
