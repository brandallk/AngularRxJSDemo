import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShakespeareService } from '../../services/shakespeare.service';
import { Character } from '../../models/play.model';

@Component({
  selector: 'app-play-table',
  templateUrl: './play-table.component.html',
  styleUrls: ['./play-table.component.css']
})
export class PlayTableComponent implements OnInit {
  playCharacters$: Observable<Character[]>;

  constructor(
    private shakespeareService: ShakespeareService
  ) {
    this.playCharacters$ = this.shakespeareService.playCharacters$;
  }

  ngOnInit() {
  }

  characterSelected(character): void {
    this.shakespeareService.updateSelectedCharacter(character);
  }

}
