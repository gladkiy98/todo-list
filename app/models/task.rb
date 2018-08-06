class Task < ApplicationRecord
  validates :title, :description, :priority, presence:true;
  #validates :future_completed_date, presence:true;
  PRIORITIES = [
      ['Later', 1],
      ['Next', 2],
      ['Now', 3]
      ]

  def complete!
    self.completed = true
    save
  end
  private

  def future_completed_date
    if !completed.blank? && completed > Date.today
      self.errors.add(:completed, "can't be in the future")
    end
  end
end
