import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-success',
  standalone: true,
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent {

  ticketId: string | null = null;
  backendUrl = environment.backendUrl;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get("token");
    if (!token) return;

    this.http.post<any>(`${this.backendUrl}/api/paypal/capture-order`, { orderId: token })
      .subscribe(res => {
        this.ticketId = res.ticketId;

        if (typeof window !== 'undefined') {
          const existing = JSON.parse(localStorage.getItem("myTickets") || "[]");

          existing.push({
            id: this.ticketId,
            event: res.event || null,
            purchasedAt: new Date().toISOString()
          });

          localStorage.setItem("myTickets", JSON.stringify(existing));
        }
      });
  }

  // ⭐ REQUIRED FUNCTION → Fixes your error
  viewTicket() {
    this.router.navigate(['/my-tickets']);
  }
}
