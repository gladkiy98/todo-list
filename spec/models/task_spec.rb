require 'rails_helper'

RSpec.describe Task do
  let(:active_task) { create(:active_task) }
  let(:completed_task) { create(:completed_task) }

  context 'on validations' do
    subject do
      task.valid?
      task.errors.full_messages
    end

    context 'when invalid data' do
      let(:task) { Task.new }

      it { is_expected.to include('User must exist') }
      it { is_expected.to include("Title can't be blank") }
      it { is_expected.to include("Completed to can't be blank") }
    end

    context 'when valid data' do
      let(:task) { build(:task) }

      it { is_expected.not_to include('User must exist') }
      it { is_expected.not_to include("Title can't be blank") }
      it { is_expected.not_to include("Completed to can't be blank") }
      it { expect(task.valid?).to be_truthy }
    end
  end

  context '#acive?' do
    subject { active_task.active? }

    let(:active_task) { build(:active_task) }

    it { is_expected.to be_truthy }
  end

  context '#completed?' do
    subject { completed_task.completed? }

    let(:completed_task) { build(:completed_task) }

    it { is_expected.to be_truthy }
  end

  context '.by_status' do
    subject { Task.by_status(status) }

    context 'when params is nil' do
      let(:status) { nil }

      it { is_expected.to include(active_task, completed_task) }
    end

    context 'when status active' do
      let(:status) { 0 }

      it { is_expected.to include(active_task) }
      it { is_expected.not_to include(completed_task) }
    end

    context 'when status completed' do
      let(:status) { 1 }

      it { is_expected.to include(completed_task) }
      it { is_expected.not_to include(active_task) }
    end
  end

  context 'callback update' do
    context 'active task' do
      before do
        active_task.update(params)
        active_task.reload
      end

      context 'when update title' do
        let(:params) { { title: 'test' } }

        it { expect(active_task.title).to eq('test') }
      end

      context 'when update status' do
        let(:params) { { status: 1 } }

        it { expect(active_task.status).to eq('completed') }
      end
    end

    context 'completed task' do
      before do
        completed_task.update(params)
        completed_task.reload
      end

      context 'when update title' do
        let(:params) { { title: 'test' } }

        it { expect(completed_task.title).to eq('Completed task') }
      end

      context 'when update status' do
        let(:params) { { status: 0 } }

        it { expect(completed_task.status).to eq('active') }
      end
    end
  end
end
