class Task < ApplicationRecord
  enum status: %i[active completed]
  scope :by_status, ->(stat) { where(status: stat) if stat }

  validates :title, presence: true
  validates :completed_to, presence: true
  validate :future_completed_date

  private

  def future_completed_date
    errors.add(:completed_to, "can't be in the future") if completed_to && completed_to < Date.today
  end
end
