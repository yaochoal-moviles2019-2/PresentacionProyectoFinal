# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_12_07_171604) do

  create_table "orders", force: :cascade do |t|
    t.string "fecha_entrega"
    t.integer "costo_total"
    t.string "direccion_entrega"
    t.string "estado"
    t.integer "calificacion_usuario"
    t.integer "calificacion_tienda"
    t.integer "cantidad"
    t.integer "user_id", null: false
    t.integer "store_id", null: false
    t.integer "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["recipe_id"], name: "index_orders_on_recipe_id"
    t.index ["store_id"], name: "index_orders_on_store_id"
    t.index ["user_id"], name: "index_orders_on_user_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "nombre"
    t.string "descripcion"
    t.string "imagen"
    t.string "ingredientes"
    t.string "precio_unitario"
    t.integer "stock"
    t.integer "store_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["store_id"], name: "index_recipes_on_store_id"
  end

  create_table "stores", force: :cascade do |t|
    t.string "nombre"
    t.string "google_id"
    t.string "correo"
    t.string "imagen"
    t.string "telefono"
    t.string "direccion"
    t.integer "saldo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "nombre"
    t.string "google_id"
    t.string "correo"
    t.string "imagen"
    t.string "telefono"
    t.string "direccion"
    t.integer "saldo"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "orders", "recipes"
  add_foreign_key "orders", "stores"
  add_foreign_key "orders", "users"
  add_foreign_key "recipes", "stores"
end
