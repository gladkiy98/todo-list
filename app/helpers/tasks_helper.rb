module TasksHelper
  def url
    Task.active.any? ? completed_task_index_path : active_task_index_path
  end
end
