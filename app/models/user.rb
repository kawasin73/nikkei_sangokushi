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
end
