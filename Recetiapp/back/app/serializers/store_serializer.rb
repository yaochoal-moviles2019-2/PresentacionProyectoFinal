class StoreSerializer < ActiveModel::Serializer
  attributes :id, :nombre, :google_id, :correo, :imagen, :telefono, :direccion, :saldo, :latitude, :longitude
  has_many :recipes
  has_many :orders
end
