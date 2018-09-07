Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks do
  end

  resources :active_task do
    put :all, on: :collection
  end

  resources :completed_task do
    put :all, on: :collection
  end
end
