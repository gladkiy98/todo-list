# frozen_string_literal: true

class Api::V1::ActiveTasksController < Api::ReactAppController
  def index
    current_user.tasks.completed.update_all(status: 0, completed_at: nil)
    render json: current_user.tasks
  end

  def update
    render json: task.update_attributes(completed_at: nil, status: 0), status: :ok
  end
end
