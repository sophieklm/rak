# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  def create
    super
    login!
  end

  # DELETE /resource/sign_out
  def destroy
    @user = current_user
    super
  end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: 200, 
      message: 'Logged in successfully.',
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }
  end

  def respond_to_on_destroy
    if @user 
      render json: {
        status: 200,
        message: 'Logged out successfully.'
      }
    else
      render json: {
        status: 401,
        error: 'No user to log out.'
      }
    end
  end
end
