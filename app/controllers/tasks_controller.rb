class TasksController < ApplicationController
  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def create
    @task = Task.create(task_params)
    if @task.errors.empty?
      redirect_to root_path
    else
      render text: 'errors'
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

  def edit
    task
  end

  def show
    render text: 'Page not found', status: 404 unless task
  end

  def destroy
    task.destroy
    render json: { success: true }
  end

  def active
    task.update_attributes(status: 0, completed_at: nil)
  end

  def completed
    task.update_attributes(completed_at: Time.now, status: 1)
  end

  private

  def task_params
    params.require(:task).permit(%i[title])
  end

  def task
    Task.find(params[:id])
  end
end
