class ActiveTasksController < ApplicationController
  def index
    current_user.tasks.completed.update_all(status: 0, completed_at: nil)
    @tasks = current_user.tasks.all.order(:sort)
    respond_to do |format|
      format.js
    end
  end

  def update
    task.update_attributes(status: 0, completed_at: nil)
  end
end
