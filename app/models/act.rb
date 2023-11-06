# frozen_string_literal: true

class Act < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
end
