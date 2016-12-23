class CreateFoundReports < ActiveRecord::Migration[5.0]
  def change
    create_table :found_reports do |t|

      t.timestamps
    end
  end
end
