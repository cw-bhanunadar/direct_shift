class Referral < ActiveRecord::Base
  STATUS = ['pending', 'accepted']

  validates :status, inclusion: { in: STATUS }
end