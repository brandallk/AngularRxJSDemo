import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { ShakespeareService } from '../../services/shakespeare.service';

@Component({
  selector: 'app-plays',
  templateUrl: './plays.component.html',
  styleUrls: ['./plays.component.css']
})
export class PlaysComponent implements OnInit {
  selectedPlay = new FormControl('Please Select');
  playsForm: FormGroup = this.builder.group({
    selectedPlay: this.selectedPlay
  });
  playTitles$: Observable<string[]>;

  constructor(
    private builder: FormBuilder,
    private shakespeareService: ShakespeareService
  ) {
    this.shakespeareService.getPlays();
    this.playTitles$ = this.shakespeareService.playTitles$;
  }

  ngOnInit() {
  }

  playSelected(): void {
    this.shakespeareService.updateSelectedPlay(this.playsForm.value.selectedPlay);
  }

}
