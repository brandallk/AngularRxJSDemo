import { Component, OnInit } from '@angular/core';
import { ShakespeareService } from '../../services/shakespeare.service';
import { Character } from '../../models/play.model';
import { Observable } from '../../../../../node_modules/rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  character$: Observable<Character>;

  constructor(
    private shakespeareService: ShakespeareService
  ) {
    this.character$ = this.shakespeareService.selectedCharacter$;
  }

  ngOnInit() {
  }

  eliminateCharacter(): void {
    this.shakespeareService.eliminateSelectedCharacter();
  }

}
