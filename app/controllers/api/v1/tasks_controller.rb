# frozen_string_literal: true

class Api::V1::TasksController < Api::ReactAppController
  def index
    tasks = current_user.tasks.by_status(params[:status]).order(:sort)
    render json: tasks
  end

  def create
    render json: current_user.tasks.create(task_params)
  end

  def update
    render json: task.update(title: params[:title]), status: :ok
  end

  def destroy
    render json: task.destroy
  end
end
