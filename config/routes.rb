Rails.application.routes.draw do
  get 'api/tasks', controller: 'tasks', action: 'index'
  post 'api/tasks', controller: 'tasks', action: 'create' 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
