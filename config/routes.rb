Rails.application.routes.draw do
  # resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  
  # Defines the root path route ("/")
  # root "articles#index"
  
  namespace :api, defaults: { format: :json }  do 
    
    resources :users, only: [:index, :create, :show, :destroy, :update] ####
    
    resource :session, only: [:show, :create, :destroy] ####
    
    resources :servers, only: [:show, :index, :create, :destroy, :update]
    
    resources :channels, only: [:show, :index, :create, :destroy, :update]
  end

  get '*path', to: "static_pages#frontend_index"
end
