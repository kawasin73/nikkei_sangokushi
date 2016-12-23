# == Schema Information
#
# Table name: stations
#
#  id         :integer          not null, primary key
#  line_id    :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_stations_on_line_id  (line_id)
#
# Foreign Keys
#
#  fk_rails_2f50bf5f3c  (line_id => lines.line_id)
#

class Station < ApplicationRecord
end
