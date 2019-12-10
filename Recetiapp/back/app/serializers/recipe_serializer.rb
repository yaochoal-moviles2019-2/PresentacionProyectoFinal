class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :nombre, :descripcion, :imagen, :ingredientes, :precio_unitario, :stock, :store
  def store
	object.store
  end
end
