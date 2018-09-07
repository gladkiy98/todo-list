class ActiveTaskController < ApplicationController
  def index
    Task.completed.update_all(status: 0, completed_at: nil)
    @tasks = Task.all.order(:sort)
    respond_to do |format|
      format.js
    end
  end

  def update
    task.update_attributes(status: 0, completed_at: nil)
  end

  private

  def task
    Task.find(params[:id])
  end
end
