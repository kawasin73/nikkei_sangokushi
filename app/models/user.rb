# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  nick_name       :string           not null
#  password        :string           not null
#  completed_count :integer          default(0), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_nick_name  (nick_name) UNIQUE
#

class User < ApplicationRecord
  has_many :access_tokens, inverce_of: :user
  has_many :check_ins, inverse_of: :user
  has_many :found_reports, through: :check_ins

  def check_in!(station)
    check_ins.find_or_create_by!(station: station)
  end

  def check_out!(station)
    check_in = check_ins.includes(:found_reports).find_by!(station: station)
    check_in.check_and_destroy!
  end
end
