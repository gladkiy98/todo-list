Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks do
    delete :clear_completed, on: :collection
    member do
      put :completed
      put :active
    end
  end
end
