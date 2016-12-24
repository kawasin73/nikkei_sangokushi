class Api::V1::UsersController < ApplicationController

  def create
    @user = AuthService.create_user(create_params)
    @access_token = @user.access_tokens.last
  end

  private

  def create_params
    params.permit([:nick_name, :password, :password_confirmation])
  end
end
