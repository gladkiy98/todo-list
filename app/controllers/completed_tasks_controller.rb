class CompletedTasksController < ApplicationController
  def index
    Task.active.update_all(status: 1, completed_at: Time.now)
    @tasks = Task.all.order(:sort)
    respond_to do |format|
      format.js
    end
  end

  def new
    Task.completed.delete_all
    respond_to do |format|
      format.js
    end
  end

  def update
    task.update_attributes(completed_at: Time.now, status: 1)
  end
end
