# frozen_string_literal: true

module Api
  module V1
    class ActsController < ApplicationController
      before_action :set_act, only: %i[show destroy]

      def index
        act = Act.order(created_at: :desc)
        render json: act
      end

      def show
        render json: @act
      end

      def create
        act = Act.create!(act_params)
        if act
          render json: act
        else
          render json: act.errors
        end
      end

      def destroy
        @act&.destroy
        render json: { message: 'RAK deleted!' }
      end

      def search
        @acts = Act.ransack(title_or_description_cont: params[:q]).result(distinct: true)
        render json: @acts
      end

      private

      def act_params
        params.permit(:title, :description, :user_id, :ai_generated)
      end

      def set_act
        @act = Act.find(params[:id])
      end
    end
  end
end
