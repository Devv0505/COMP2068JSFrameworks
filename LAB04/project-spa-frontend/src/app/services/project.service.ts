import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:3000/projects';

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProject(project: any) {
    return this.http.post<any>(this.apiUrl, project);
  }

  updateProject(id: string, project: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
