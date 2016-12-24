class CreateFoundReports < ActiveRecord::Migration[5.0]
  def change
    create_table :found_reports do |t|
      t.references :check_in, null: false, foreign_key: true
      t.text :image, null: true
      t.text :comment, null: true

      t.timestamps
    end
  end
end
