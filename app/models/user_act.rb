# frozen_string_literal: true

class UserAct < ApplicationRecord
  belongs_to :user
  belongs_to :act

  validates :act, uniqueness: { scope: :user }
end
