# frozen_string_literal: true

class Api::V1::CompletedTasksController < Api::ReactAppController
  def update
    render json: task.update_attributes(completed_at: Time.now, status: 1), status: :ok
  end
end
