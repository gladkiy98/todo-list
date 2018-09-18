# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CompletedTasksController do
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
      active_task.reload
    end

    context 'when update all' do
      it { expect(active_task.status).to eq('completed') }
    end

    context 'when @tasks have objects' do
      it do
        get :index, xhr: true
        expect(assigns(:tasks)).not_to be nil
      end
    end
  end

  describe '#new' do
    subject do
      proc do
        active_task
        completed_task
        get :new, xhr: true
      end
    end

    context 'when delete all' do
      it { is_expected.to change(Task, :count).by(-1) }
    end
  end

  describe '#update' do
    before do
      put :update, params: { id: active_task }
      active_task.reload
    end

    context 'when valid attribute' do
      it { expect(active_task.status).to eq('completed') }
    end
  end
end
