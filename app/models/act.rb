# frozen_string_literal: true

class Act < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true

  has_many :user_acts, dependent: :destroy
  has_many :completions, dependent: :destroy

  belongs_to :user

  def self.ransackable_attributes(auth_object = nil)
    ["description", "title"]
  end
  
  def self.ransackable_associations(auth_object = nil)
    []
  end
end
