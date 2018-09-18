# frozen_string_literal: true

FactoryBot.define do
  factory :task do
    title { Faker::Name.first_name }
    completed_to { Faker::Date.forward(10) }
    status { rand(0..1) }
    user

    factory :active_task do
      title { 'Active task' }
      status { 0 }
    end

    factory :completed_task do
      title { 'Completed task' }
      status { 1 }
    end
  end
end
