class Api::V1::CheckInsController < ApplicationController
  before_action :authenticate, only: [:index, :create, :destroy]
  before_action :set_station, only: [:create, :destroy]

  def index
    @check_ins = current_user.check_ins.all
  end

  def create
    current_user.check_in!(@station)
    render_success('success to check in')
  end

  def destroy
    current_user.check_out!(@station)
    render_success('success to check out')
  rescue CheckIn::DestroyError
    render_error('failed to check out')
  end

  private

  def set_station
    @station = Station.find(params[:station_id])
  end
end
