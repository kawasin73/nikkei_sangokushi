json.data do
  json.report do
    json.partial! 'api/v1/found_report/found_report', found_report: @found_report
  end
end
