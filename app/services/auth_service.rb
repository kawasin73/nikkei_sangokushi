module AuthService
  class AuthServiceError < StandardError
  end
  class ProviderTakenError < StandardError
  end
  class GenerateTokenError < StandardError
  end
  class ProviderNotFoundError < StandardError
  end

  def authenticate(token)
    AuthService::TokenAuthenticator.new(token).authenticated_user
  end

  def authenticate_token(token)
    AuthService::TokenAuthenticator.new(token).authenticated_token
  end

  # refresh token
  # @param [String] refresh_token
  # @return [AccessToken] new access_token
  # @return [nil] refresh_token is invalid or refresh_token
  def refresh_token(refresh_token)
    AuthService::CreateUser.refresh_token(refresh_token)
  end

  def create_user(params)
    AuthService::CreateUser.create_user(params)
  end
end
