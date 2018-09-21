# frozen_string_literal: true

class Api::V1::TasksController < ApplicationController
  def index
    render json: current_user.tasks.by_status(params[:status]).order(:sort)
  end

  def create
    render json: current_user.tasks.create(task_params)
  end

  private

  def task_params
    params.require(:task).permit(%i[title completed_to])
  end
end
