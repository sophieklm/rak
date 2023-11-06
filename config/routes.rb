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
      resources :acts, only: %i[index create show destroy]
      resources :users, only: %i[show]
      resources :user_acts, only: %i[create destroy]
      resources :completions, only: %i[create]
      delete '/completions', to: 'completions#destroy'
    end
  end

  get 'homepage/index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'homepage#index'
end
