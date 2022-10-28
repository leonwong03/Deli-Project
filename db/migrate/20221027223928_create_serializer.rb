class CreateSerializer < ActiveRecord::Migration[7.0]
  def change
    create_table :serializers do |t|
      t.string :sessions

      t.timestamps
    end
  end
end
