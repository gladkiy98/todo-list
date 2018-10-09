# frozen_string_literal: true

class TasksController < ApplicationController
  def index
    @task = Task.new
    @tasks = current_user.tasks.by_status(params[:status]).order(:sort)
    @active_counte = current_user.tasks.active.count
  end

  def create
    @task = current_user.tasks.create(task_params)
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
end
