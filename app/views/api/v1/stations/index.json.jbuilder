json.data do
  json.array! @stations, partial: 'station', as: :station
end
