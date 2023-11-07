# frozen_string_literal: true

class OpenAi::ApiRequester
  def initialize(
    client: OpenAI::Client.new(access_token: ENV.fetch("OPENAI_ACCESS_TOKEN"))
  )
    @client = client
  end

  # MAX_RETRIES = 1

  def call(engine: "gpt-3.5-turbo")
    @engine = engine
    @prompt = prompt
    @count = 0
    @response = nil

    # while @count < MAX_RETRIES && !@response&.ok?
    #   @count += 1
    #   @response = make_request!
    # end
    @response = make_request!

    throw(@response.error) if @response.error.present?
    @response
    @parsed_response = parsed_response
  end

  private

  def make_request!
    OpenAi::ApiResponse.new(
      @client.chat(
        parameters: {
          model: @engine,
          messages: @prompt,
        }
      )
    )
  end

  def prompt
    [
      { role: "system", content: system_message },
    ]
  end

  def system_message
    <<~SYS_MESSAGE
      Generate a random act of kindness for a user to save and complete.
      
      Here are some examples:

      #{acts_to_json.to_json}

      Generate something new, not one that already exists in the above examples.

      Respond with JSON data in following format:

      #{response_format_json}
    SYS_MESSAGE
  end

  private

  def acts
    @act ||= Act.all
  end

  def acts_to_json
    acts.map do |act|
      act.to_json
    end
  end

  def parsed_response
    return unless @response.text.present?

    JSON.parse(@response.text)
  end

  def response_format_json
    <<~JSON
      {
        title: "title",
        description: "description",
      }
    JSON
  end
end
