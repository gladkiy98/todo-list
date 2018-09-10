class CompletedTasksController < ApplicationController
  def index
    current_user.tasks.active.update_all(status: 1, completed_at: Time.now)
    @tasks = current_user.tasks.order(:sort)
    respond_to do |format|
      format.js
    end
  end

  def new
    current_user.tasks.completed.delete_all
    respond_to do |format|
      format.js
    end
  end

  def update
    task.update_attributes(completed_at: Time.now, status: 1)
  end
end
