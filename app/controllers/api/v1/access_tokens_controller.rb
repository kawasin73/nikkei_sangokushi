class Api::V1::AccessTokensController < ApplicationController
  before_action :authenticate, only: [:revoke]

  def create
    @access_token = AuthService.invoke_token(params[:nick_name], params[:password])
    if @access_token.present?
      @user = @access_token.user
      render template: 'api/v1/users/create'
    else
      render_error('failed to invoke token', status: :unauthorized)
    end
  end

  def refresh
    @access_token = AuthService.refresh_token(params[:refresh_token])
    if @access_token.present?
      render :create
    else
      render_error('failed to refresh token', status: :unauthorized)
    end
  end

  def revoke
    if current_access_token.present? && current_access_token.revoke
      render_success('success to revoke token')
    else
      render_error('failed to revoke token')
    end
  end
end
