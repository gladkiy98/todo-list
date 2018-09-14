require 'rails_helper'

RSpec.describe ActiveTasksController do
  let(:user) { create(:user_with_tasks) }
  let(:active_task) { user.tasks.active.first }
  let(:completed_task) { user.tasks.completed.first }

  before do
    user.confirm
    sign_in user
  end

  describe '#index' do
    before do
      active_task
      completed_task
      get :index, xhr: true
    end

    context 'when update all' do
      before { completed_task.reload }

      it { expect(completed_task.status).to eq('active') }
    end

    context 'when tasks have records' do
      it { expect(assigns(:tasks)).to include(active_task, completed_task) }
    end
  end

  describe '#update' do
    before do
      put :update, params: { id: completed_task }
      completed_task.reload
    end

    context 'when update title' do
      it { expect(completed_task.status).to eq('active') }
    end

    context 'when update completed_at' do
      it { expect(completed_task.completed_at).to eq(nil) }
    end
  end
end
