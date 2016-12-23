class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :nick_name, null: false
      t.string :password, null: false
      t.integer :completed_count, null: false, default: 0

      t.timestamps

      t.index :nick_name, unique: true
    end
  end
end
