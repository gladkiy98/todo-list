Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks do
    member do
      put :completed
      put :active
    end
  end
  post 'create', to: 'tasks#create', as: :task_create
end
