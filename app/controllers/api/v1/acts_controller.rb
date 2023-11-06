class Api::V1::ActsController < ApplicationController
  before_action :set_act, only: %i[show destroy]

  def index
    act = Act.all.order(created_at: :desc)
    render json: act
  end

  def create
    act = Act.create!(act_params)
    if act
      render json: act
    else
      render json: act.errors
    end
  end

  def show
    render json: @act
  end

  def destroy
    @act&.destroy
    render json: { message: 'RAK deleted!' }
  end

  private

  def act_params
    params.permit(:title, :description)
  end

  def set_act
    @act = Act.find(params[:id])
  end
end
