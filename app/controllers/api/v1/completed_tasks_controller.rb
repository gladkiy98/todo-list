# frozen_string_literal: true

class Api::V1::CompletedTasksController < Api::ReactAppController
  def index
    current_user.tasks.active.update_all(status: 1, completed_at: Time.now)
    render json: current_user.tasks
  end

  def new
    render json: current_user.tasks.completed.delete_all, status: :ok
  end

  def update
    render json: task.update_attributes(completed_at: Time.now, status: 1), status: :ok
  end
end
