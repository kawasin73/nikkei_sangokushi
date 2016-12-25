json.data do
  json.check_ins do
    json.array! @check_ins, partial: 'check_in', as: :check_in
  end
end
