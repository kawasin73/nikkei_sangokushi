# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161223225710) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lines", force: :cascade do |t|
    t.integer  "line_id",    null: false
    t.string   "name",       null: false
    t.string   "name_kana",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_lines_on_line_id", unique: true, using: :btree
  end

  create_table "stations", force: :cascade do |t|
    t.integer  "line_id",    null: false
    t.string   "name",       null: false
    t.string   "name_kana",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_stations_on_line_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "nick_name",                   null: false
    t.string   "password",                    null: false
    t.integer  "completed_count", default: 0, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["nick_name"], name: "index_users_on_nick_name", unique: true, using: :btree
  end

  add_foreign_key "stations", "lines", primary_key: "line_id"
end
