class CreateCheckIns < ActiveRecord::Migration[5.0]
  def change
    create_table :check_ins do |t|
      t.references :user, null: false, foreign_key: true
      t.references :station, null: false, foreign_key: true
      t.boolean :is_found, null: false, default: false

      t.timestamps

      t.index [:user_id, :station_id], unique: true
    end
  end
end
