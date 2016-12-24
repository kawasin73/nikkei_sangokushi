class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  # URL: http://sourcey.com/building-the-prefect-rails-5-api-only-app/
  include ActionController::HttpAuthentication::Token::ControllerMethods

  class NotFound < StandardError
  end
  class Forbidden < StandardError
  end

  def authenticate
    authenticate_token || render_unauthorized
  end

  def authenticate_token
    authenticate_with_http_token do |token, _options|
      @current_user = AuthService.authenticate(token)
    end
  end

  def render_unauthorized(realm = 'Application')
    self.headers['WWW-Authenticate'] = %(Token realm="#{realm.delete('"')}")
    render_error('Bad credentials', status: :unauthorized)
  end

  def current_user
    @current_user ||= authenticate_token
  end

  def current_access_token
    if @current_access_token.present?
      @current_access_token
    else
      token, _ = ActionController::HttpAuthentication::Token.token_and_options(self.request)
      @current_access_token = AuthService.authenticate_token(token)
    end
  end

  def render_success(message)
    render json: { data: { message: message } }
  end

  def render_error(message, status: :bad_request)
    render json: { error: { message: message } }, status: status
  end
end
