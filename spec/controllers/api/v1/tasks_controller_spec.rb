# frozen_string_literal: true

require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::TasksController do
  let(:user) { create(:user_with_tasks) }
  let(:active_task) { user.tasks.active.first }
  let(:completed_task) { user.tasks.completed.first }

  before do
    user.confirm
    sign_in user
  end

  describe '#index' do
    subject { Task.by_status(status) }

    before { get :index, format: :json }

    context 'when params nil' do
      it { expect(json[0].status).to eql('active') }

      it { expect(json[1].status).to eql('completed') }
    end

    context 'when params active' do
      let(:status) { 0 }

      it { is_expected.to include(active_task) }
    end

    context 'when params completed' do
      let(:status) { 1 }

      it { is_expected.to include(completed_task) }
    end
  end

  describe '#destroy' do
    subject { -> { delete :destroy, format: :json, params: { id: task } } }

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
