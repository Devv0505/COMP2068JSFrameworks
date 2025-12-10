import { Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SuccessComponent } from './success/success.component';
import { TicketComponent } from './ticket/ticket.component';
import { MyTicketsComponent } from './my-tickets/my-tickets.component';

export const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'ticket/:id', component: TicketComponent },
  { path: 'my-tickets', component: MyTicketsComponent },
  { path: 'success', component: SuccessComponent },

  // ⭐ VERY IMPORTANT FOR RENDER DEPLOYMENT ⭐
  { path: '**', redirectTo: 'events' }
];