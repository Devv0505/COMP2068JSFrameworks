import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';  // ✅ IMPORT ENVIRONMENT

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket: any = null;
  errorMessage = '';
  backendUrl = environment.backendUrl;  // ✅ USE BACKEND URL FROM ENV

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Invalid ticket ID';
      return;
    }

    this.http.get(`${this.backendUrl}/api/tickets/${id}`)
      .subscribe({
        next: (data) => this.ticket = data,
        error: () => this.errorMessage = 'Could not load ticket'
      });
  }
}
