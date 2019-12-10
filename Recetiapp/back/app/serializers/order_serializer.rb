class OrderSerializer < ActiveModel::Serializer
  attributes :id, :fecha_entrega, :costo_total, :direccion_entrega, :estado, :calificacion_usuario, :calificacion_tienda, :cantidad, :latitude, :longitude, :recipe, :store, :user,
  def recipe
	object.recipe
  end
  def store
	object.store
  end
  def user
	object.user
  end
end
