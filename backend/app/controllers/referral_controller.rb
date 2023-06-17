class ReferralController < ApplicationController
  before_action :authenticate_user!

  def create
    @referral = Referral.new(referral_params)
    if @referral.save

      ReferralMailer.with(referral: @referral).referral_mail.deliver_later
      render json: { 
        data: {
          id: @referral.id
        }
       }, status: 200
    else
      render json: {
        message: "Failed"
      }, status: 400
    end

  end

  def list
    render json: { 
      list: Referral.where(referred_by: current_user.email)
     }, status: 200
  end

  def referral_params
    params.require(:referral).permit(:name, :email).merge(referred_by: current_user.email)
  end
end