class MigrationName < ActiveRecord::Migration[6.0]
  def change
	add_column :users, :latitude, :string
	add_column :users, :longitude, :string
	add_column :stores, :latitude, :string
	add_column :stores, :longitude, :string
	add_column :orders, :latitude, :string
	add_column :orders, :longitude, :string
  end
end
