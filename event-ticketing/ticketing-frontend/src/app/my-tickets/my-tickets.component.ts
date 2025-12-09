import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './my-tickets.component.html'
})
export class MyTicketsComponent {

  tickets: any[] = [];
  totalAmount: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    const saved = localStorage.getItem("myTickets");

    if (saved) {
      this.tickets = JSON.parse(saved);

      this.totalAmount = this.tickets.reduce((sum, t) => {
        return sum + (t.event?.price || 0);
      }, 0);
    }
  }

  // ⭐ BACK BUTTON METHOD
  goBack() {
    this.router.navigate(['/events']);
  }
}
