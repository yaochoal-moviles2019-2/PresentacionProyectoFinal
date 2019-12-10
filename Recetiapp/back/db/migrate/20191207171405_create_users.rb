class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :nombre
      t.string :google_id
      t.string :correo
      t.string :imagen
      t.string :telefono
      t.string :direccion
      t.integer :saldo

      t.timestamps
    end
  end
end
