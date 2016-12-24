module AuthService
  class AuthServiceError < StandardError
  end
  class ProviderTakenError < StandardError
  end
  class GenerateTokenError < StandardError
  end
  class ProviderNotFoundError < StandardError
  end
end
