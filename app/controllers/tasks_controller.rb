class TasksController < ApplicationController
  def index
    @tasks = Task.all
    @task = Task.new
  end

  def create
    Task.create(task_params)
    @tasks = Task.all.order('created_at DESC')
    respond_to do |format|
      format.js
    end
  end

  def update
    task.update_attributes(task_params)
    if @task.errors.empty?
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def destroy
    task.destroy
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
