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
#  index_check_ins_on_station_id  (station_id)
#  index_check_ins_on_user_id     (user_id)
#
# Foreign Keys
#
#  fk_rails_76f7b3ea96  (station_id => stations.id)
#  fk_rails_b15c016c97  (user_id => users.id)
#

class CheckIn < ApplicationRecord
end
