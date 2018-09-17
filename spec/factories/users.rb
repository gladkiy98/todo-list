FactoryBot.define do
  factory :user do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { 'password' }
    password_confirmation { 'password' }
    confirmed_at { Time.now }

    factory :user_with_tasks do
      after(:create) do |user|
        create(:active_task, user: user)
        create(:completed_task, user: user)
      end
    end
  end
end
