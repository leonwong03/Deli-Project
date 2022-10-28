class VapesController < ApplicationController

    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
    rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

    def index
        vapes = Vape.all
        render json: vapes, status: :ok
    end

    def show
        vape = Vape.find(params[:id])
        render json: vape, status: :ok
    end

    def update
        vape = Vape.find(params[:id])
        vape.update!(vape_params)

        render json: vape, status: :ok
    end

    def create
        vape = Vape.create!(vape_params)
        render json: vape, status: :created
    end

    def destroy
        vape = Vape.find(params[:id])
        vape.user_items.destroy
        vape.destroy

        head :no_content
    end



    private 

    def render_not_found
        render json: {error: "Vape Not Found"}, status: :not_found
    end

    def record_invalid(invalid)

        render json: {errors: invalid.record.errors.full_messages}, status: :not_found
    end

    def vape_params
        params.permit(:name, :price, :image_url)
    end

end
