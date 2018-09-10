module TasksHelper
  def update_status_url
    @active_counte != 0 ? completed_tasks_path : active_tasks_path
  end
end
