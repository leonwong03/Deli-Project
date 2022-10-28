class VapeReviewSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :vape_id, :rating, :comment
end
