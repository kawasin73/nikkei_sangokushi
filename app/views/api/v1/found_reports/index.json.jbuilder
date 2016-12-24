json.data do
  json.found_reports do
    json.array! @found_reports, partial: 'api/v1/found_reports/found_report', as: :found_report
  end
end
