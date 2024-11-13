import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GamelistComponent } from "./gamelist/gamelist.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GamelistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'videogames';
}
