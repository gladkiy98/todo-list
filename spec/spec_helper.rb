# frozen_string_literal: true

require 'simplecov'
SimpleCov.start

require 'rails_helper'
require 'rspec-rails'

Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

RSpec.configure do |config|
  config.include Helpers::JsonHelpers

  config.fail_fast = true

  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.order = :random

  config.shared_context_metadata_behavior = :apply_to_host_groups
end
