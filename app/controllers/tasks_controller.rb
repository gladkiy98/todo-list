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

  def clear_completed
    Task.completed.delete_all
    respond_to do |format|
      format.js
    end
  end

  def completed_all
    Task.active.update_all(status: 1, completed_at: Time.now)
    @tasks = Task.all
    respond_to do |format|
      format.js
    end
  end

  def active_all
    Task.completed.update_all(status: 0, completed_at: nil)
    @tasks = Task.all
    respond_to do |format|
      format.js
    end
  end

  def active
    task.update_attributes(status: 0, completed_at: nil)
  end

  def completed
    task.update_attributes(completed_at: Time.now, status: 1)
  end

  private

  def task_params
    params.require(:task).permit(%i[title completed_to])
  end

  def task
    Task.find(params[:id])
  end
end
