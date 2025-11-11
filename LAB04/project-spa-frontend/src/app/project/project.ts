import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './project.html',
  styleUrls: ['./project.css']
})
export class Project implements OnInit {
  projects: any[] = [];
  newProject = { name: '', dueDate: '', course: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // ✅ GET all projects
  loadProjects(): void {
    this.http.get<any[]>('http://localhost:3000/projects').subscribe({
      next: data => this.projects = data,
      error: err => console.error('❌ Error fetching projects:', err)
    });
  }

  // ✅ POST new project
  addProject(): void {
    if (!this.newProject.name || !this.newProject.dueDate || !this.newProject.course) {
      alert('Please fill all fields!');
      return;
    }

    this.http.post('http://localhost:3000/projects', this.newProject).subscribe({
      next: (response: any) => {
        console.log('✅ Project added:', response);
        this.projects = response.projects; // update the list immediately
        this.newProject = { name: '', dueDate: '', course: '' }; // clear form
      },
      error: err => console.error('❌ Error adding project:', err)
    });
  }
}
