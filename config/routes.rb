Rails.application.routes.draw do
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  }, 
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  namespace :api do
    namespace :v1 do
      get 'acts/index'
      post 'acts/create'
      get '/show/:id', to: 'acts#show'
      delete '/destroy/:id', to: 'acts#destroy'
      get 'users/:id', to: 'users#show'
    end
  end

  get 'homepage/index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
end
