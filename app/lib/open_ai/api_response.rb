# frozen_string_literal: true

class OpenAi::ApiResponse
  def initialize(response)
    @response = response
  end

  def raw
    @response
  end

  def ok?
    error.blank? && text.present?
  end

  def chat?
    @response["object"] == 'chat.completion'
  end

  def error
    @response["error"]
  end

  def text
    return first_message.dig('message', 'content') if chat?

    @response.dig("choices", 0, "text")
  end

  def first_message
    @response.dig('choices').find do |message|
      message.dig('message', 'role') == 'assistant'
    end
  end
end
