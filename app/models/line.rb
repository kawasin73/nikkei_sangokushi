# == Schema Information
#
# Table name: lines
#
#  id         :integer          not null, primary key
#  line_id    :integer          not null
#  name       :string           not null
#  name_kana  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_lines_on_line_id  (line_id) UNIQUE
#

class Line < ApplicationRecord
  has_many :stations, inverse_of: :line

  validates :name, presence: true
  validates :name_kana, presence: true
end
