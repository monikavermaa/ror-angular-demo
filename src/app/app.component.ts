import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title: string = 'My Angular App';
  tasks: any[] = [];
  newTask: any = { title: '', description: '' }; // Initialize a new task object

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    // Fetch existing tasks when the component initializes
    this.fetchTasks();
  }

  fetchTasks() {
    // Update the URL to point to your Rails server
    this.httpClient.get('http://localhost:3000/api/tasks').subscribe((data: any) => {
      this.tasks = data.task; // Assuming the response structure has a 'task' property
    });
  }
  
  createTask() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRF-TOKEN': this.getCSRFTokenFromCookie(), // Replace with the actual method to get the CSRF token from the cookie
    });
  
    const options = { headers: headers };
  
    this.httpClient
      .post('http://localhost:3000/api/tasks', this.newTask, options)
      .subscribe(
        (data: any) => {
          // Task created successfully, you can handle this case here.
          // Maybe clear the form or display a success message.
          this.newTask = { title: '', description: '' };
        },
        (error: any) => {
          // Error occurred during task creation. Handle the error here.
          console.error('Error creating task:', error);
          if (error.status === 422) {
            // Extract and display validation error messages to the user.
            const validationErrors = error.error;
            // Handle validation errors here.
            // You can display validation error messages to the user.
          }
        }
      );
  }
  
  private getCSRFTokenFromCookie(): string {
    const cookieValue = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='));
    if (cookieValue) {
      return cookieValue.split('=')[1];
    }
    return '';
  }
  
}
