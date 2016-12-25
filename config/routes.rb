Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: 'json' }, constraints: { format: :json } do
    namespace :v1 do
      resources :check_ins, only: [:index, :create] do
        delete '/', action: :destroy
      end
      resources :found_reports, only: [:create, :update, :destroy]

      resources :stations, only: [:index] do
        resources :found_reports, only: [:index]
      end
      resources :users, only: [:create] do
        resources :found_reports, only: [:index]
      end
      resource :token, controller: :access_tokens, only: [:create] do
        put :refresh
        delete :revoke
      end
    end
  end

  root 'static#index'
  get '*path', to: 'static#index'
end
