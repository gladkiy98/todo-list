# frozen_string_literal: true

class Api::V1::ActiveTasksController < Api::ReactAppController
  def update
    render json: task.update_attributes(completed_at: nil, status: 0)
  end
end
