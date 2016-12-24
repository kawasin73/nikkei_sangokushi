json.id found_report.id
json.image_url found_report.image # TODO: image_url
json.comment found_report.comment
station = found_report.station
json.station do
  json.partial! 'api/v1/stations/station', station: station
end
json.user do
  json.partial! 'api/v1/users/user', user: station.user
end
