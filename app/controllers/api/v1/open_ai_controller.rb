# frozen_string_literal: true

module Api
  module V1
    class OpenAiController < ApplicationController
      def create
        open_ai_response = OpenAi::ApiRequester.new.call
        render json: open_ai_response
      end
    end
  end
end
