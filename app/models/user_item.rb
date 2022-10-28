class UserItem < ApplicationRecord

    belongs_to :vape
    belongs_to :user

    validates :vape, presence: true
    validates :user, presence:true

end
