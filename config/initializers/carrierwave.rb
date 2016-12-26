CarrierWave.configure do |config|
  if Rails.env.production?
    config.root = Rails.root.join('tmp')
    config.cache_dir = "#{Rails.root}/tmp/uploads"

    config.fog_provider = 'fog/aws'
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: ENV['AWS_REGION']
    }
    config.fog_attributes = {'Cache-Control' => "public, max-age=#{1.day.to_i}"}
    config.fog_directory = ENV['ASSET_S3_BUCKET_NAME']
    config.asset_host = ENV['ASSET_HOST']
  end
end
