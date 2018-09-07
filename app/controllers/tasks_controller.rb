class TasksController < ApplicationController
  def index
    @task = Task.new
    @tasks = Task.by_status(params[:status]).order(:sort)
    @active_counte = Task.active.count
  end

  def create
    @task = Task.create(task_params)
    respond_to do |format|
      format.js
    end
  end

  def update
    task.update(title: params[:title])
  end

  def destroy
    task.destroy
    respond_to do |format|
      format.js
    end
  end

  private

  def task_params
    params.require(:task).permit(%i[title completed_to])
  end

  def task
    Task.find(params[:id])
  end
end
