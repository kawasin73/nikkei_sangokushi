class CreateLines < ActiveRecord::Migration[5.0]
  def change
    create_table :lines do |t|
      t.integer :line_id, null: false
      t.string :name, null: false

      t.timestamps

      t.index :line_id, unique: true
    end
  end
end
