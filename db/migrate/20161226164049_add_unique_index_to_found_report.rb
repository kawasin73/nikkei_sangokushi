class AddUniqueIndexToFoundReport < ActiveRecord::Migration[5.0]
  def change
    remove_index :found_reports, :check_in_id
    add_index :found_reports, :check_in_id, unique: true
  end
end
