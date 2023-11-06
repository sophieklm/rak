# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, :password, :password_confirmation, presence: true
  validates :email, uniqueness: true

  has_many :user_acts, dependent: :destroy
  has_many :completions, dependent: :destroy
end
