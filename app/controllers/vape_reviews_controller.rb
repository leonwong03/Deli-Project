class VapeReviewsController < ApplicationController
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        vape_reviews = VapeReview.all
        render json: vape_reviews, status: :ok
    end

    def show
        vape_reviews = VapeReview.find(params[:id])
        render json: vape_reviews, status: :ok
    end

    def update
        vape_reviews = VapeReview.find(params[:id])
        vape_reviews.update!(vape_reviews_params)
        render json: vape_reviews, status: :ok
    end

    def create
        vape_reviews = VapeReview.create!(vape_reviews_params)
        vape_reviews json: vape_reviews, status: :created
    end

    def destroy
        vape_reviews = VapeReview.find(params[:id])
        vape_reviews.destroy
        head :no_content
    end

    def get_vape_reviews
        vape_reviews = VapeReview.where(vape_id: params[:vape_id]).all
        render json: vape_reviews, status: :ok
    end

    def get_user_vape_reviews
        vape_reviews = VapeReview.find_by(user_id: params[:user_id])
        render json: vape_reviews, status: :ok
    end

    private 

    def render_not_found
        render json: {error: "Vape Not Found"}, status: :not_found
    end

    def record_invalid(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :not_found
    end

    def vape_reviews_params
        params.permit(:user_id, :vape_id, :comment, :rating)
    end
    
end

