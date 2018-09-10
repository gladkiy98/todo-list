Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks, only: %i[index create update destroy]

  resources :active_tasks, only: %i[index update]

  resources :completed_tasks, only: %i[index new update]
end
