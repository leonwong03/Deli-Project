class CreateVapeReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :vape_reviews do |t|
      t.integer :user_id
      t.integer :vape_id
      t.integer :rating
      t.string :comment

      t.timestamps
    end
  end
end
