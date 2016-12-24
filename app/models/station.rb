# == Schema Information
#
# Table name: stations
#
#  id          :integer          not null, primary key
#  line_id     :integer          not null
#  name        :string           not null
#  name_kana   :string           not null
#  found_count :integer          default(0), not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
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
  belongs_to :line, inverse_of: :stations
  has_many :check_ins, inverse_of: :station
  has_many :found_reports, through: :check_ins

  def update_found_count
    self.found_count = found_reports.count
  end
end
