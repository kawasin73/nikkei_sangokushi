Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: 'json'}, constraints: {format: :json} do
    namespace :v1 do
      resources :check_ins, only: [:create] do
        delete '/', action: :destroy
      end

      resources :stations, only: [:index]
    end
  end
end
