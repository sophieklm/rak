# frozen_string_literal: true

module Api
  module V1
    class UserActsController < ApplicationController
      before_action :set_user_act, only: %i[destroy]

      def create
        user_act = UserAct.create!(user_act_params)
        if user_act
          render json: user_act
        else
          render json: user_act.errors
        end
      end

      def destroy
        @user_act&.destroy
        render json: { message: 'Unsaved' }
      end

      private

      def user_act_params
        params.require(:user_act).permit(:user_id, :act_id)
      end

      def set_user_act
        @user_act = UserAct.find(params[:id])
      end
    end
  end
end
