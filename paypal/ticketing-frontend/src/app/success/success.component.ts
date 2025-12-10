import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface TicketRecord {
  id: string;
  event: {
    _id: string;
    title: string;
    price: number;
    currency: string;
    date: string;
  } | null;
  purchasedAt: string;
}

@Component({
  selector: 'app-success',
  standalone: true,
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  ticketId: string | null = null;

  // ✅ Correct — this is the variable you will actually use
  backendUrl = environment.backendUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get("token");

    if (!token) {
      console.warn("⚠ No PayPal token found in URL.");
      return;
    }

    // ⭐ Capture PayPal order using backend URL
    this.http.post<any>(`${this.backendUrl}/api/paypal/capture-order`, { orderId: token })
      .subscribe({
        next: (res) => {
          this.ticketId = res.ticketId;

          // ⭐ Save ticket locally
          this.saveTicket(res.event);
        },
        error: (err) => {
          console.error("Error capturing order:", err);
        }
      });
  }

  // ⭐ Save ticket to localStorage safely
  private saveTicket(eventData: any): void {
    try {
      const saved = localStorage.getItem("myTickets");
      const list: TicketRecord[] = saved ? JSON.parse(saved) : [];

      const newRecord: TicketRecord = {
        id: this.ticketId || "unknown",
        event: eventData || null,
        purchasedAt: new Date().toISOString()
      };

      list.push(newRecord);

      localStorage.setItem("myTickets", JSON.stringify(list));
      console.log("Ticket saved:", newRecord);

    } catch (err) {
      console.error("LocalStorage save error:", err);
    }
  }

  // ⭐ Navigate to My Tickets page
  viewTicket(): void {
    this.router.navigate(['/my-tickets']);
  }
}
