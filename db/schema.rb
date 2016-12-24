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

ActiveRecord::Schema.define(version: 20161224004615) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "access_tokens", force: :cascade do |t|
    t.integer  "user_id",                        null: false
    t.string   "token",                          null: false
    t.string   "refresh_token",                  null: false
    t.integer  "expires_in",         default: 0, null: false
    t.datetime "revoked_at"
    t.string   "prev_refresh_token"
    t.datetime "created_at"
    t.index ["refresh_token"], name: "index_access_tokens_on_refresh_token", unique: true, using: :btree
    t.index ["token"], name: "index_access_tokens_on_token", unique: true, using: :btree
    t.index ["user_id"], name: "index_access_tokens_on_user_id", using: :btree
  end

  create_table "check_ins", force: :cascade do |t|
    t.integer  "user_id",                    null: false
    t.integer  "station_id",                 null: false
    t.boolean  "is_found",   default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["station_id"], name: "index_check_ins_on_station_id", using: :btree
    t.index ["user_id", "station_id"], name: "index_check_ins_on_user_id_and_station_id", unique: true, using: :btree
    t.index ["user_id"], name: "index_check_ins_on_user_id", using: :btree
  end

  create_table "found_reports", force: :cascade do |t|
    t.integer  "check_in_id", null: false
    t.text     "image"
    t.text     "comment"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["check_in_id"], name: "index_found_reports_on_check_in_id", using: :btree
  end

  create_table "lines", force: :cascade do |t|
    t.integer  "line_id",    null: false
    t.string   "name",       null: false
    t.string   "name_kana",  null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["line_id"], name: "index_lines_on_line_id", unique: true, using: :btree
  end

  create_table "stations", force: :cascade do |t|
    t.integer  "line_id",                 null: false
    t.string   "name",                    null: false
    t.string   "name_kana",               null: false
    t.integer  "found_count", default: 0, null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
    t.index ["line_id"], name: "index_stations_on_line_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "nick_name",                   null: false
    t.string   "password_hash",               null: false
    t.string   "password_salt",               null: false
    t.integer  "completed_count", default: 0, null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["nick_name"], name: "index_users_on_nick_name", unique: true, using: :btree
  end

  add_foreign_key "access_tokens", "users"
  add_foreign_key "check_ins", "stations"
  add_foreign_key "check_ins", "users"
  add_foreign_key "found_reports", "check_ins"
  add_foreign_key "stations", "lines", primary_key: "line_id"
end
