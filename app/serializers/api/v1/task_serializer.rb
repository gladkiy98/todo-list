# frozen_string_literal: true

class Api::V1::TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :completed_to, :completed_at, :status

  def completed_at
    object.completed_at&.localtime&.strftime('%e %b %Y %H:%M')
  end
end
