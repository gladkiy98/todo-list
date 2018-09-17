require 'rails_helper'

RSpec.describe User do
  let(:user) { create(:user_with_tasks) }
  let(:active_task) { user.tasks.active.first }
  let(:completed_task) { user.tasks.completed.first }

  context 'when user have tasks' do
    it { expect(user.tasks).to include(active_task, completed_task) }
  end
end
