# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::ActiveTasksController do
  let(:user) { create(:user_with_tasks) }
  let(:active_task) { user.tasks.active.first }
  let(:completed_task) { user.tasks.completed.first }

  before do
    user.confirm
    sign_in user
  end

  describe '#update' do
    before { put :update, format: :json, params: { id: completed_task } }

    context 'when valid attribute' do
      it { expect(response.status).to eq(200) }
    end
  end
end
