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
end
