require 'test_helper'

class RecipesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do
    get recipes_url, as: :json
    assert_response :success
  end

  test "should create recipe" do
    assert_difference('Recipe.count') do
      post recipes_url, params: { recipe: { descripcion: @recipe.descripcion, imagen: @recipe.imagen, ingredientes: @recipe.ingredientes, nombre: @recipe.nombre, precio_unitario: @recipe.precio_unitario, stock: @recipe.stock, store_id: @recipe.store_id } }, as: :json
    end

    assert_response 201
  end

  test "should show recipe" do
    get recipe_url(@recipe), as: :json
    assert_response :success
  end

  test "should update recipe" do
    patch recipe_url(@recipe), params: { recipe: { descripcion: @recipe.descripcion, imagen: @recipe.imagen, ingredientes: @recipe.ingredientes, nombre: @recipe.nombre, precio_unitario: @recipe.precio_unitario, stock: @recipe.stock, store_id: @recipe.store_id } }, as: :json
    assert_response 200
  end

  test "should destroy recipe" do
    assert_difference('Recipe.count', -1) do
      delete recipe_url(@recipe), as: :json
    end

    assert_response 204
  end
end
