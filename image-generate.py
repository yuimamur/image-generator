import requests
import os

# Pixabay APIキーを設定
PIXABAY_API_KEY = 'MY API Key'

# 犬の画像を検索するためのパラメータ
search_query = 'dog'
image_type = 'photo'
per_page = 30

# Pixabay APIから画像を取得する関数
def get_dog_images(api_key, query, image_type, per_page):
    url = f'https://pixabay.com/api/?key={api_key}&q={query}&image_type={image_type}&per_page={per_page}'
    response = requests.get(url)
    data = response.json()
    return data['hits']

# 画像をダウンロードする関数
def download_images(images, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for i, image in enumerate(images):
        image_url = image['webformatURL']
        response = requests.get(image_url)
        with open(os.path.join(output_folder, f'dog_{i + 1}.jpg'), 'wb') as f:
            f.write(response.content)

if __name__ == '__main__':
    # Pixabay APIから犬の画像を取得
    dog_images = get_dog_images(PIXABAY_API_KEY, search_query, image_type, per_page)

    # 画像をダウンロード
    output_folder = 'dog_images'
    download_images(dog_images, output_folder)
