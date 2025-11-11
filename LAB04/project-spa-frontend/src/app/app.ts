import { Component } from '@angular/core';
import { Project } from './project/project';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Project],
  template: `<app-project></app-project>`
})
export class App {}
