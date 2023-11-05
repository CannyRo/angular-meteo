import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { OverviewComponent } from "../overview/overview.component";
import { FavoriteComponent } from "../favorite/favorite.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    imports: [CommonModule, SearchBarComponent, OverviewComponent, FavoriteComponent]
})
export class HomeComponent {

}
