import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface EventItem {
  _id: string;
  title: string;
  description?: string;
  date: string;
  price: number;
  currency: string;
}

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  backendUrl = 'http://localhost:4000';
  events: EventItem[] = [];
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // 🔥 ALWAYS LOAD EVENTS WHEN WE ARRIVE ON THIS PAGE
  ionViewDidEnter() {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get<EventItem[]>(`${this.backendUrl}/api/events`)
      .subscribe({
        next: (data) => {
          this.events = data;
        },
        error: () => {
          this.errorMessage = 'Could not load events.';
        }
      });
  }

  buyTicket(event: EventItem): void {
    this.http.post<any>(`${this.backendUrl}/api/paypal/create-order`, { eventId: event._id })
      .subscribe({
        next: (data) => {
          window.open(data.approvalUrl, "_blank");
        },
        error: () => {
          this.errorMessage = "Checkout failed.";
        }
      });
  }
}
