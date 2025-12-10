import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

interface TicketRecord {
  id: string;
  event: {
    _id: string;
    title: string;
    price: number;
    currency: string;
    date: string;
  } | null;
  purchasedAt: string;   // ✅ Add this line
}

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './my-tickets.component.html'
})
export class MyTicketsComponent implements OnInit {

  tickets: TicketRecord[] = [];
  totalAmount: number = 0;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTickets();
  }

  // ⭐ Load tickets safely from localStorage
  loadTickets(): void {
    try {
      const saved = localStorage.getItem("myTickets");

      if (!saved) {
        console.warn("No tickets found in localStorage");
        this.tickets = [];
        this.totalAmount = 0;
        return;
      }

      const parsed = JSON.parse(saved);

      // Validate structure
      if (Array.isArray(parsed)) {
        this.tickets = parsed;
      } else {
        this.tickets = [];
      }

      // ⭐ Calculate total price
      this.totalAmount = this.tickets.reduce((sum, t) => {
        return sum + (t.event?.price || 0);
      }, 0);

    } catch (err) {
      console.error("LocalStorage parse error:", err);
      this.tickets = [];
      this.totalAmount = 0;
    }
  }

  // ⭐ Navigate back to main events page
  goBack(): void {
    this.router.navigate(['/events']);
  }
}
