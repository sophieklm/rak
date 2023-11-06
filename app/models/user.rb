class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
        
  validates_presence_of :email, :password, :password_confirmation
  validates_uniqueness_of :email

  has_many :user_acts
end
