json.data do
  json.user do
    json.partial! 'api/v1/users/user', user: @user
  end
  json.access_token do
    json.partial! 'api/v1/access_tokens/access_token', access_token: @access_token
  end
end
