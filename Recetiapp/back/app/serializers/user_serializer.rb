class UserSerializer < ActiveModel::Serializer
  attributes :id, :nombre, :google_id, :correo, :imagen, :telefono, :direccion, :saldo, :latitude, :longitude
  has_many :orders
end
