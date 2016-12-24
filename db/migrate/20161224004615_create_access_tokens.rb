class CreateAccessTokens < ActiveRecord::Migration[5.0]
  def change
    create_table :access_tokens do |t|
      t.references :user, foreign_key: true, null: false
      t.string :token, null: false
      t.string :refresh_token, null: false
      t.integer :expires_in, null: false, default: 0
      t.datetime :revoked_at
      t.string :prev_refresh_token, null: true

      t.datetime :created_at
    end

    add_index :access_tokens, :token, unique: true
    add_index :access_tokens, :refresh_token, unique: true
  end
end
