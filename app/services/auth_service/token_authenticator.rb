module AuthService
  class TokenAuthenticator
    def initialize(token)
      @token = token
    end

    def authenticated_user
      access_token.user if accessible?
    end

    def authenticated_token
      access_token if accessible?
    end

    private

    def access_token
      @access_token ||= AccessToken.find_by(token: @token.to_s)
    end

    def accessible?
      access_token.present? ? access_token.accessible? : false
    end
  end
end
