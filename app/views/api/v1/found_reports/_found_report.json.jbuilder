json.id found_report.id
json.image_url found_report.image_url
json.comment found_report.comment
json.station do
  json.partial! 'api/v1/stations/station', station: found_report.station
end
json.user do
  json.partial! 'api/v1/users/user', user: found_report.user
end
