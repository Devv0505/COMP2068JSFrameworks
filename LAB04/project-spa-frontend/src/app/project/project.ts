import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../services/project.service';

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

  // Editing fields
  isEditing = false;
  editProjectData = { _id: '', name: '', dueDate: '', course: '' };

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  // GET all projects
  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: data => this.projects = data,
      error: err => console.error('❌ Error fetching projects:', err)
    });
  }

  // ADD new project
  addProject(): void {
    if (!this.newProject.name || !this.newProject.dueDate || !this.newProject.course) {
      alert('Please fill all fields!');
      return;
    }

    this.projectService.addProject(this.newProject).subscribe({
      next: (createdProject) => {
        console.log('✅ Project added:', createdProject);

        this.projects.push(createdProject);  // update UI instantly
        this.clearForm();
      },
      error: (err) => console.error('❌ Error adding project:', err)
    });
  }

  // START EDITING
  startEdit(project: any) {
    this.isEditing = true;
    this.editProjectData = { ...project };
  }

  // SAVE EDIT
  saveEdit() {
    this.projectService.updateProject(this.editProjectData._id, this.editProjectData)
      .subscribe({
        next: (updated) => {
          const index = this.projects.findIndex(p => p._id === updated._id);
          this.projects[index] = updated; // update UI instantly
          this.isEditing = false;
        },
        error: err => console.error('❌ Error updating project:', err)
      });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  // DELETE PROJECT
  deleteProject(id: string) {
    if (!confirm("Are you sure you want to delete this project?")) return;

    this.projectService.deleteProject(id).subscribe({
      next: () => {
        this.projects = this.projects.filter(p => p._id !== id);
      },
      error: err => console.error('❌ Error deleting project:', err)
    });
  }

  // CLEAR FORM
  clearForm() {
    this.newProject = { name: '', dueDate: '', course: '' };
  }

}
