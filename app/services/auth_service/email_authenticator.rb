module AuthService
  class EmailAuthenticator

    include ActiveSupport::SecurityUtils

    def initialize(nick_name, password)
      @nick_name = nick_name
      @password = password
    end

    def authenticated_user
      @user ||= get_user
    end

    def invoke_token
      if authenticated_user.present?
        user_service = CreateUser.new(authenticated_user)
        user_service.invoke_token
      else
        nil
      end
    end

    private

    def get_user
      user = User.find_by(nick_name: @nick_name)
      if user.present? &&
        secure_compare(user.password_hash, BCrypt::Engine.hash_secret(@password, user.password_salt))
        user
      else
        nil
      end
    end

  end
end
