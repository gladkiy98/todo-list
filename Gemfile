# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.1'

gem 'bootsnap', '>= 1.1.0', require: false
gem 'bootstrap', '~> 4.1.3'
gem 'bootstrap-datepicker-rails'
gem 'coffee-rails', '~> 4.2'
gem 'devise'
gem 'jbuilder', '~> 2.5'
gem 'jquery-rails', '~> 4.3', '>= 4.3.1'
gem 'jquery-ui-rails'
gem 'momentjs-rails'
gem 'popper_js', '~> 1.14.3'
gem 'puma', '~> 3.11'
gem 'rails', '~> 5.2.0'
gem 'rails_sortable'
gem 'rubocop', '~> 0.59.1', require: false
gem 'sass-rails', '~> 5.0'
gem 'simple_form'
gem 'uglifier', '>= 1.3.0'

group :production do
  gem 'pg', '~> 0.21.0'
end
group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem 'brakeman'
  gem 'listen', '>= 3.0.5', '< 3.2'

  gem 'web-console', '>= 3.3.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'letter_opener'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :development, :test do
  gem 'bullet'
  gem 'factory_bot_rails'
  gem 'pry'
  gem 'rspec-rails', '~> 3.8'
end

group :test do
  gem 'faker'
  gem 'rails-controller-testing'
  gem 'rubocop-rspec'
  gem 'simplecov', require: false
  gem 'simplecov-rcov'
end
