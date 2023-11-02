require "test_helper"

class Api::V1::ActsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_acts_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_acts_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_acts_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_acts_destroy_url
    assert_response :success
  end
end
