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
end
