class UserItemsController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        user_items = UserItem.all
        render json: user_items, status: :ok
    end

    def show
        user_item = UserItem.find(params[:id])
        render json: user_item, status: :ok
    end

    def update
        user_item = UserItem.find(params[:id])
        user_item.update!(user_item_params)
        render json: user_item, status: :ok
    end

    def create
        user_item = UserItem.create!(user_item)
        user_item json: user_item, status: :created
    end

    def destroy
        user_item = UserItem.find(params[:id])
        user_item.destroy
        head :no_content
    end

    private 
    
    def render_not_found
        render json: {error: "Shoe Not Found"}, status: :not_found
    end

    def record_invalid(invalid)

        render json: {errors: invalid.record.errors.full_messages}, status: :not_found
    end

    def user_item_params
        params.permit(:user_id, :vape_id, :vape_review)
    end
    
end
