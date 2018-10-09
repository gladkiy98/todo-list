# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  def task
    current_user.tasks.find(params[:id])
  end

  def task_params
    params.require(:task).permit(%i[title completed_to])
  end
end
