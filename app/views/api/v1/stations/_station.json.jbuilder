json.id station.id
json.name station.name
json.name_kana station.name_kana
json.found_count station.found_count
json.line do
  json.partial! 'api/v1/lines/line', line: station.line
end
