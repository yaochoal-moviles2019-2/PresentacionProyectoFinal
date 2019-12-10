class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :fecha_entrega
      t.integer :costo_total
      t.string :direccion_entrega
      t.string :estado
      t.integer :calificacion_usuario
      t.integer :calificacion_tienda
      t.integer :cantidad
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :store, null: false, foreign_key: true
      t.belongs_to :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
