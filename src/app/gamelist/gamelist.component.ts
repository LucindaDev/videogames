import { Component } from '@angular/core';
import { GameServiceService } from '../services/game-service.service';
import { Game } from '../interfaces/Game';
import { HttpClientModule } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-gamelist',
  standalone: true,
  imports: [HttpClientModule, NgFor, ReactiveFormsModule],
  providers: [GameServiceService],
  templateUrl: './gamelist.component.html',
  styleUrl: './gamelist.component.css'
})
export class GamelistComponent {
  games: Game[] = [];
  filteredGames: Game[] = [];
  searchForm: FormGroup;

  constructor(
    private gameService: GameServiceService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchTitle: ['']
    });
  }

  ngOnInit() {
    this.loadAllGames();
    this.setUpSearch();
  }

  loadAllGames() {
    this.gameService.getGames().subscribe({
      next: (games) => {
        this.games = games;
        this.filteredGames = games;
      },
      error: (error) => {
        console.log('Error fetching games');
      }
    })
  }

  setUpSearch(): void {
    this.searchForm.get('searchTitle')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.filterByTitle(searchTerm);
      });
  }

  filterByTitle(title: string): void {
    if (!title) {
      this.filteredGames = this.games;
    } else {
      this.filteredGames = this.games.filter(game =>
        game.title.toLowerCase().includes(title.toLowerCase())
      );
    }
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
