class Api::V1::FoundReportsController < ApplicationController
  before_action :authenticate, only: [:create, :update, :destroy]
  before_action :set_found_report, only: [:update, :destroy]

  def index
    source = if params[:station_id].present?
               Station.find(params[:station_id])
             elsif params[:user_id].present?
               User.find(params[:user_id])
             else
               raise NotFound
             end
    @found_reports = source.found_reports.all.includes(check_in: [:user, :station])
  end

  def create
    station = Station.find(params[:station_id])
    @found_report = ApplicationRecord.transaction do
      check_in = current_user.check_in!(station)
      check_in.create_found_report!(create_params)
    end
    render action: :update
  end

  def update
    @found_report.update(update_params)
  end

  def destroy
    station = @found_report.station
    ApplicationRecord.transaction do
      @found_report.destroy!
      station.found_count -= 1
      station.save!
    end
    render_success('success to delete report')
  end

  private

  def create_params
    params.permit([:image, :comment])
  end

  def update_params
    params.permit([:image, :comment])
  end

  def set_found_report
    @found_report = current_user.found_reports.find(params[:id])
  end
end
