class ReferralMailer < ApplicationMailer
  default from: 'bhanunadar03@gmail.com'

  def referral_mail
    @referral = params[:referral]
    @url  = ENV['WEBSITE_URL']
    mail(to: @referral.email, subject: 'You have been referred!!')
  end
end
