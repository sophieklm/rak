# frozen_string_literal: true

module Api
  module V1
    class CompletionsController < ApplicationController
      before_action :set_completions, only: %i[destroy]

      def create
        completion = Completion.create!(completion_params)
        if completion
          render json: completion
        else
          render json: completion.errors
        end
      end

      def destroy
        @completions&.destroy_all
        render json: { message: 'Uncompleted' }
      end

      private

      def completion_params
        params.require(:completion).permit(:user_id, :act_id)
      end

      def set_completions
        @completions = Completion.where(user_id: params[:user_id], act_id: params[:act_id])
      end
    end
  end
end
