import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Calendar } from '../components/calendar/calendar';

@Component({
  selector: 'app-dashboard',
  imports: [RouterModule, Calendar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
})
export class Dashboard {}
