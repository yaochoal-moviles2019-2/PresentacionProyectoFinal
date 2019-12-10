class ChangeLatitude < ActiveRecord::Migration[6.0]
  def change
	remove_column :users, :latitude
	remove_column :users, :longitude
	remove_column :stores, :latitude
	remove_column :stores, :longitude
	remove_column :orders, :latitude
	remove_column :orders, :longitude
	
    add_column  :users, :latitude, :float
	add_column  :users, :longitude, :float
	add_column  :stores, :latitude, :float
	add_column  :stores, :longitude, :float
	add_column  :orders, :latitude, :float
	add_column  :orders, :longitude, :float
  end
end
