# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  after_create :check_referral_present

  def check_referral_present
    referral = Referral.where(email: self.email).take
    referral.update_columns(status: 'accepted') if referral.present?
  end
end
