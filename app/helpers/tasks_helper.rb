module TasksHelper
  def update_status_url(active_count)
    active_count != 0 ? completed_tasks_path : active_tasks_path
  end
end
