require 'open-uri'
require 'json'
require 'fileutils'

# Pixabay APIキーを設定
PIXABAY_API_KEY = 'MY API Key'

# パンダの画像を検索するためのパラメータ
search_query = 'panda'
image_type = 'photo'
per_page = 30

# Pixabay APIから画像を取得するメソッド
def get_panda_images(api_key, query, image_type, per_page)
  url = "https://pixabay.com/api/?key=#{api_key}&q=#{query}&image_type=#{image_type}&per_page=#{per_page}"
  response = URI.open(url).read
  data = JSON.parse(response)
  data['hits']
end

# 画像をダウンロードするメソッド
def download_images(images, output_folder)
  FileUtils.mkdir_p(output_folder) unless File.directory?(output_folder)

  images.each_with_index do |image, i|
    image_url = image['webformatURL']
    image_data = URI.open(image_url).read
    File.binwrite(File.join(output_folder, "panda_#{i + 1}.jpg"), image_data)
  end
end

# Pixabay APIからパンダの画像を取得
panda_images = get_panda_images(PIXABAY_API_KEY, search_query, image_type, per_page)

# 画像をダウンロード
output_folder = 'panda_images'
download_images(panda_images, output_folder)

