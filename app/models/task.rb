class Task < ApplicationRecord
  validates :title, :description, :priority, presence: true
  validates :completed_to, presence: true
  validate :future_completed_date
  PRIORITIES = [
    ['Later', 1],
    ['Next', 2],
    ['Now', 3]
  ].freeze

  def complete!
    self.completed = true
    save
  end

  private

  def future_completed_date
    errors.add(:completed_to, "can't be in the future") if completed_to && completed_to < Date.today
  end
end
