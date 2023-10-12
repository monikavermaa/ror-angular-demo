class TasksController < ApplicationController 
  def index
		@task = Task.all
		render json: {task: @task}
	end

	def create
		@task = Task.new(task_params)
	
		if @task.save
			render json: { task: @task }, status: :created
		else
			render json: { error: 'Failed to create task' }, status: :unprocessable_entity
		end
	end
	
	# ...
	
	private
	
	def task_params
		params.require(:task).permit(:title, :description)

	end
	
end


