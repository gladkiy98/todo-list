Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks do
    put :completed, on: :member
  end
  post 'create', to: 'tasks#create', as: :task_create
end
