class ChangeCompletedAtToBeDatetimeInTasks < ActiveRecord::Migration[5.2]
  def change
    change_column :tasks, :completed_at, :datetime
  end
end
