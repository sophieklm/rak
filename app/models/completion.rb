# frozen_string_literal: true

class Completion < ApplicationRecord
  belongs_to :user
  belongs_to :act
end
