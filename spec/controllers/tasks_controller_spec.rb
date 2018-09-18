# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TasksController do
  let(:user) { create(:user_with_tasks) }
  let(:active_task) { user.tasks.active.first }
  let(:completed_task) { user.tasks.completed.first }

  before do
    user.confirm
    sign_in user
  end

  describe '#index' do
    subject { Task.by_status(status) }

    before { get :index }

    context 'when @task have params' do
      it { expect(assigns(:task)).not_to be nil }
    end

    context 'when @tasks with params nil' do
      let(:status) { nil }

      it { is_expected.to include(active_task, completed_task) }
    end

    context 'when @tasks with status active' do
      let(:status) { 0 }

      it { is_expected.to include(active_task) }
    end

    context 'when @tasks with status completed' do
      let(:status) { 1 }

      it { is_expected.to include(completed_task) }
    end

    context 'when @active_counte have count' do
      subject { assigns(:active_counte) }

      before do
        active_task
        completed_task
        get :index
      end

      it { is_expected.to be 1 }
    end
  end

  describe '#create' do
    context 'when valid attributes' do
      let(:params) { { task: attributes_for(:active_task) } }

      it { expect { post :create, xhr: true, params: params }.to change(Task, :count).by(1) }
    end

    context 'when invalid attributes' do
      let(:params) { { task: attributes_for(:active_task, completed_to: Time.now - 4.day) } }

      it { expect { post :create, xhr: true, params: params }.to change(Task, :count).by(0) }
    end
  end

  describe '#update' do
    context 'when valid title attribute' do
      before do
        put :update, params: { id: active_task, title: 'test' }
        active_task.reload
      end

      it { expect(active_task.title).to eq('test') }
    end

    context 'when invalid title attribute' do
      before do
        put :update, params: { id: completed_task, title: 'invalid text' }
        completed_task.reload
      end

      it { expect(completed_task.title).to eq('Completed task') }
    end
  end

  describe '#destroy' do
    subject { -> { delete :destroy, xhr: true, params: { id: task } } }

    context 'when delete completed task' do
      let(:task) { completed_task }

      it { is_expected.to change(Task, :count).by(-1) }
    end

    context 'when delete active task' do
      let(:task) { active_task }

      it { is_expected.to change(Task, :count).by(-1) }
    end
  end
end
