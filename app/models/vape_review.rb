class VapeReview < ApplicationRecord

    has_one :user, through: :user_id
    has_one :vape, through: :vape_id

        validates :user_id, presence: true
        validates :vape_id, presence: true
        validates :comment, presence: true
        validates :rating, presence: true

end
