json.data do
  json.stations do
    json.array! @stations, partial: 'station', as: :station
  end
end
