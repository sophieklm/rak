
module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show]

      def create
        @user = User.new(user_params)
          if @user.save
            login!
            render json: {
              status: :created,
              user: @user
            }
          else 
            render json: {
              status: 500,
              errors: @user.errors.full_messages
            }
          end
      end

      def show
        render json: @user
      end

      private
          
      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end