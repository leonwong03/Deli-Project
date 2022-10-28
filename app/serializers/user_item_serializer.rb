class UserItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id, :item_id
end
