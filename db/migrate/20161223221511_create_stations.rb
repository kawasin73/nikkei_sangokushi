class CreateStations < ActiveRecord::Migration[5.0]
  def change
    create_table :stations do |t|
      t.integer :line_id, null: false
      t.string :name, null: false

      t.timestamps

      t.index :line_id
    end

    add_foreign_key :stations, :lines, column: :line_id, primary_key: :line_id
  end
end
