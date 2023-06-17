class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  after_action :set_expose_headers

  def set_expose_headers
    response.headers['Access-Control-Expose-Headers'] = '*'
  end
end
  