import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calendar } from '../components/calendar/calendar';
import { Balances } from '../components/balances/balances';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, Calendar, Balances],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard {}
