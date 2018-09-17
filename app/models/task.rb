class Task < ApplicationRecord
  include RailsSortable::Model

  belongs_to :user

  set_sortable :sort
  enum status: %i[active completed]
  scope :by_status, ->(status) { where(status: status) if status }

  before_update :disable_edit_on_completed

  validates :title, presence: true
  validates :completed_to, presence: true
  validate :future_completed_date

  private

  def disable_edit_on_completed
    raise ActiveRecord::Rollback if !status_changed? && completed?
  end

  def future_completed_date
    errors.add(:completed_to, "can't be in the future") if completed_to && completed_to < Date.today
  end
end
