Rails.application.routes.draw do
  devise_for :users
  root 'tasks#index'
  resources :tasks do
  end

  resources :active_task do
  end

  resources :completed_task do
  end
end
