# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TasksHelper do
  subject { update_status_url(Task.active.count) }

  let(:active_task) { create(:active_task) }
  let(:completed_task) { create(:completed_task) }

  context 'when 1 completed, 1 active' do
    before { active_task }

    it { is_expected.to include('/completed_task') }
  end

  context 'when 1 completed' do
    before { completed_task }

    it { is_expected.to include('/active_task') }
  end
end
