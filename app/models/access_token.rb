# == Schema Information
#
# Table name: access_tokens
#
#  id                 :integer          not null, primary key
#  user_id            :integer          not null
#  token              :string           not null
#  refresh_token      :string           not null
#  expires_in         :integer          default(0), not null
#  revoked_at         :datetime
#  prev_refresh_token :string
#  created_at         :datetime
#
# Indexes
#
#  index_access_tokens_on_refresh_token  (refresh_token) UNIQUE
#  index_access_tokens_on_token          (token) UNIQUE
#  index_access_tokens_on_user_id        (user_id)
#
# Foreign Keys
#
#  fk_rails_96fc070778  (user_id => users.id)
#

class AccessToken < ApplicationRecord
  belongs_to :user, inverse_of: :access_tokens
  validates :token, uniqueness: true
  validates :refresh_token, uniqueness: true

  def accessible?
    !expired? && !revoked?
  end

  def expired?
    expire_time < Time.zone.now
  end

  def expire_time
    created_at + expires_in.seconds
  end

  def revoked?
    revoked_at.present? && revoked_at <= Time.zone.now
  end

  def revoke(revoked_at = Time.zone.now)
    revoke!(revoked_at)
    true
  rescue => e
    Rails.logger.info(e)
    Rails.logger.info(e.backtrace.join("\n"))
    false
  end

  def revoke!(revoked_at = Time.zone.now)
    update!(revoked_at: revoked_at)
  end

  def prev_access_token
    AccessToken.find_by(refresh_token: prev_refresh_token) if prev_refresh_token.present?
  end

  def generate_token
    count = 0
    loop do
      prev_token = token
      token = SecureRandom.urlsafe_base64(64)
      break token if !AccessToken.exists?(token: token) && token != prev_token
      raise AuthService::GenerateTokenError if ++count > 1000
    end
  end

  def generate_refresh_token
    count = 0
    loop do
      prev_token = refresh_token
      refresh_token = SecureRandom.urlsafe_base64(64)
      break refresh_token if !AccessToken.exists?(refresh_token: refresh_token) && refresh_token != prev_token
      raise AuthService::GenerateTokenError if ++count > 1000
    end
  end
end
