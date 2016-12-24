json.data do
  json.access_token do
    json.partial! 'access_token', access_token: @access_token
  end
end
