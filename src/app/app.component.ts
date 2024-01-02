import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home/home.component';
import { Observable, Subject } from 'rxjs';
import { City } from './city';
import { Weather } from './weather';
import { FacadeService } from './services/facade.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomeComponent, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-meteo';

}
