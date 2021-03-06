# == Schema Information
#
# Table name: found_reports
#
#  id          :integer          not null, primary key
#  check_in_id :integer          not null
#  image       :text
#  comment     :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
# Indexes
#
#  index_found_reports_on_check_in_id  (check_in_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_8f18889645  (check_in_id => check_ins.id)
#

class FoundReport < ApplicationRecord
  belongs_to :check_in, inverse_of: :found_report

  delegate :station, :user, to: :check_in

  mount_uploader :image, ReportImageUploader
end
