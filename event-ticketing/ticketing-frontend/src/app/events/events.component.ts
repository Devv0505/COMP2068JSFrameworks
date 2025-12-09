import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';


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

  backendUrl = environment.backendUrl;   // ✅ Now using Render backend URL
  events: EventItem[] = [];
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  // 🚀 Load events from backend
  loadEvents(): void {
      console.log("Fetching events from:", `${this.backendUrl}/api/events`);
    this.http.get<EventItem[]>(`${this.backendUrl}/api/events`)
      .subscribe({
        next: (data) => {
          this.events = data;
        },
        error: () => {
          this.errorMessage = 'Could not load events from server.';
        }
      });
  }

  // 🟦 BUY TICKET
  buyTicket(event: EventItem): void {
    this.errorMessage = '';

    this.http.post<any>(`${this.backendUrl}/api/paypal/create-order`, { eventId: event._id })
      .subscribe({
        next: (data) => {
          if (!data?.approvalUrl) {
            this.errorMessage = "Could not start PayPal checkout.";
            return;
          }
          window.open(data.approvalUrl, "_blank");
        },
        error: () => {
          this.errorMessage = "Checkout failed.";
        }
      });
  }
}
