import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  backendUrl = environment.backendUrl;
  events: EventItem[] = [];
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    const url = `${this.backendUrl}/api/events`;
    console.log("FETCHING:", url);

    this.http.get<EventItem[]>(url).subscribe({
      next: (data) => {
        console.log("EVENTS LOADED:", data);
        this.events = [...data];   // New array → forces UI refresh
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error("LOAD ERROR:", err);
        this.errorMessage = "Could not load events.";
        this.cd.detectChanges();
      }
    });
  }

  buyTicket(event: EventItem): void {
    const url = `${this.backendUrl}/api/paypal/create-order`;

    this.http.post<any>(url, { eventId: event._id }).subscribe({
      next: (data) => {
        console.log("PAYPAL RESPONSE:", data);
        if (data?.approvalUrl) {
          window.open(data.approvalUrl, "_blank");
        } else {
          this.errorMessage = "PayPal approval URL missing.";
        }
      },
      error: (err) => {
        console.error("PAYPAL ERROR:", err);
        this.errorMessage = "Checkout failed.";
      }
    });
  }
}
