# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      before_action :set_user, only: %i[show]

      def show
        render json: @user, include: %i[user_acts completions]
      end

      private

      def set_user
        @user = User.find(params[:id])
      end
    end
  end
end
