Rails.application.routes.draw do
    
    resources :vapes
    resources :user_items
    resources :users
    resources :vape_reviews 
    # resource :vapes do 
    #     resource :vape_reviews
    # end

    get "/vapes/:vape_id/vape_reviews", to: "vape_reviews#get_vape_reviews"

    get "/users/:user_id/vape_reviews", to: "vape_reviews#get_user_vape_reviews"

    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"


    get '*path',
        to: 'fallback#index',
        constraints: ->(req) { !req.xhr? && req.format.html? }

    

end
