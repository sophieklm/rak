# frozen_string_literal: true

class Act < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :user_acts, dependent: :destroy
  has_many :completions, dependent: :destroy

  belongs_to :user
end
