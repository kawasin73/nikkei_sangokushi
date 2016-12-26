CarrierWave.configure do |config|
  config.root = Rails.root.join('tmp') if Rails.env.production?
  config.cache_dir = "#{Rails.root}/tmp/uploads"
end
