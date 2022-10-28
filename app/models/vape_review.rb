class VapeReview < ApplicationRecord

    belongs_to :user
    belongs_to :vape
    
    validates :comment, presence: true
    validates :rating, presence: true, numericality: { only_float: true }


end
