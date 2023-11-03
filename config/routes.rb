Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'acts/index'
      post 'acts/create'
      get '/show/:id', to: 'acts#show'
      delete '/destroy/:id', to: 'acts#destroy'
      resources :users, only: [:create, :show, :index]
      resources :sessions, only: [:create]
    end
  end

  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  get 'homepage/index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
end
