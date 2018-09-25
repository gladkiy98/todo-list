# frozen_string_literal: true

class Api::ReactAppController < ApplicationController
  layout 'react_app'
  skip_before_action :verify_authenticity_token
end
