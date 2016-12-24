class Api::V1::StationsController < ApplicationController

  def index
    case params[:type]
    when 'line'
      line = Line.find(params[:line_id])
      @stations = line.stations.includes(:line).order(line_id: :desc)
    else
      @stations = Station.all.includes(:line).order(line_id: :desc)
    end
  end

end
