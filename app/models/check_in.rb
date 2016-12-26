# == Schema Information
#
# Table name: check_ins
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  station_id :integer          not null
#  is_found   :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_check_ins_on_station_id              (station_id)
#  index_check_ins_on_user_id                 (user_id)
#  index_check_ins_on_user_id_and_station_id  (user_id,station_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_76f7b3ea96  (station_id => stations.id)
#  fk_rails_b15c016c97  (user_id => users.id)
#

class CheckIn < ApplicationRecord
  class DestroyError < StandardError
  end

  belongs_to :user, inverse_of: :check_ins
  belongs_to :station, inverse_of: :check_ins
  has_one :found_report, inverse_of: :check_in

  def can_delete?
    found_reports.count == 0
  end

  def check_and_destroy!
    if can_delete?
      destroy!
    else
      raise DestroyError, 'can not destroy'
    end
  end
end
