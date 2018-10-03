# frozen_string_literal: true

module Helpers
  module JsonHelpers
    def json
      @json ||= JSON.parse(response.body, object_class: OpenStruct)
    end
  end
end
