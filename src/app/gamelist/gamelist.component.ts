import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { Game } from '../interfaces/Game';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-gamelist',
  standalone: true,
  imports: [HttpClientModule, NgFor],
  providers: [GameServiceService],
  templateUrl: './gamelist.component.html',
  styleUrl: './gamelist.component.css'
})
export class GamelistComponent {
  games: Game[] = [];

  constructor(private gameService: GameServiceService) { }

  ngOnInit() {
    this.gameService.getGames().subscribe((data) => {
      this.games = data;
    });
  }

  onchangePlatform(event: any) {
    this.gameService.getGamesByPlatform(event.target.value).subscribe((data) => {
      this.games = data;
    });
  }

  onchangeCategory(event: any) {
    this.gameService.getGamesByCategory(event.target.value).subscribe((data) => {
      this.games = data;
    });
  }
}
