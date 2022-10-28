class User < ApplicationRecord
    has_secure_password

    has_many :user_items
    has_many :vapes, through: :user_items
    has_many :vape_reviews

    validates :username, uniqueness: true
    validates :username, presence: true
    validates :first_name, presence: true
    validates :last_name, presence: true
    
    # validates :password, confirmation:true
    # validates :password_confirmation, presence:true

end