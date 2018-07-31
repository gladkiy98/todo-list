class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string    :title
      t.text      :description
      t.integer   :priority
      t.date      :completed_to
      t.boolean   :completed ,null: false, default: false
      t.timestamps
    end
  end
end
