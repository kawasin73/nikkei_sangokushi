module AuthService
  class CreateUser

    attr_reader :user

    ACCESS_TOKEN_EXPIRES_IN = 30 * 24 * 60 * 60

    def initialize(user)
      @user = user
    end

    def refresh_token(access_token)
      return nil if access_token.revoked?
      ApplicationRecord.transaction do
        new_access_token = build_access_token(prev_refresh_token: access_token.refresh_token)
        new_access_token.save!
        access_token.prev_access_token.revoke! if access_token.prev_access_token.present?
        new_access_token
      end
    end

    def invoke_token
      access_token = build_access_token
      access_token.save!
      access_token
    end

    class << self
      def create_user(params)
        ApplicationRecord.transaction do
          user = ::User.create!(params)
          user_service = self.new(user)
          user_service.invoke_token
          user
        end
      end

      def refresh_token(refresh_token)
        access_token = ::AccessToken.find_by(refresh_token: refresh_token)
        if access_token.present?
          CreateUser.new(access_token.user).refresh_token(access_token)
        else
          nil
        end
      end
    end

    private

    def build_access_token(prev_refresh_token: nil)
      user.access_tokens.build do |access_token|
        access_token.token = access_token.generate_token
        access_token.refresh_token = access_token.generate_refresh_token
        access_token.prev_refresh_token = prev_refresh_token
        access_token.expires_in = ACCESS_TOKEN_EXPIRES_IN
      end
    end
  end
end
