# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  nick_name       :string           not null
#  password_hash   :string           not null
#  password_salt   :string           not null
#  completed_count :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_nick_name  (nick_name) UNIQUE
#

class User < ApplicationRecord
  has_many :access_tokens, inverse_of: :user
  has_many :check_ins, inverse_of: :user
  has_many :found_reports, through: :check_ins

  validates :nick_name, presence: true, uniqueness: true
  validates :password_hash, presence: true
  validates :password_salt, presence: true
  validates :password, confirmation: true

  before_validation :encrypt_password

  attr_accessor :password

  def check_in!(station)
    check_ins.find_or_create_by!(station: station)
  end

  def check_out!(station)
    check_in = check_ins.includes(:found_reports).find_by!(station: station)
    check_in.check_and_destroy!
  end

  private

  def encrypt_password
    if password.present?
      self.password_salt = BCrypt::Engine.generate_salt
      self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)
    end
  end
end
