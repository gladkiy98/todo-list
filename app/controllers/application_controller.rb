# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :authenticate_user!

  layout :layout_by_controller

  protected

  def layout_by_controller
    devise_controller? ? 'devise' : 'application'
  end

  def task
    current_user.tasks.find(params[:id])
  end
end
