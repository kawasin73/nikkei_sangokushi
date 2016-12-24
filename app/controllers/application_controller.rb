class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def authenticate
    # authenticate
  end

  def current_user
    # TODO: current_user
  end

  def render_success(message)
    render json: { data: { message: message } }
  end

  def render_error(message, status: :bad_request)
    render json: { error: { message: message } }, status: status
  end
end
