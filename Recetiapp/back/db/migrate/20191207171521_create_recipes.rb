class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :nombre
      t.string :descripcion
      t.string :imagen
      t.string :ingredientes
      t.string :precio_unitario
      t.integer :stock
      t.belongs_to :store, null: false, foreign_key: true

      t.timestamps
    end
  end
end
