class Vape < ApplicationRecord

    has_many :user_items
    has_many :users, through: :user_items

    has_many :vape_review

    validates :name, presence: true
    validates :name, uniqueness: true
    validates :price, presence: true
    validates :price,  numericality: { only_float: true }
    validates :image_url, presence: true

end
