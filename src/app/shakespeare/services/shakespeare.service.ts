import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { Play, Character } from '../models/play.model';

@Injectable()
export class ShakespeareService {

  private _plays = new BehaviorSubject<Play[]>([]);
  plays$ = this._plays.asObservable();

  playTitles$: Observable<string[]>;

  private _selectedPlay = new BehaviorSubject<Play>(new Play());
  selectedPlay$ = this._selectedPlay.asObservable();

  playCharacters$: Observable<Character[]>;

  private _selectedCharacter = new BehaviorSubject<Character>(new Character());
  selectedCharacter$ = this._selectedCharacter.asObservable();

  constructor(private http: Http) {
    this.playTitles$ = this.plays$.pipe(
      map(plays => {
        return plays.map(play => play.title);
      }),
      // tap(playTitles => console.log('playTitles', playTitles))
    );

    this.playCharacters$ = this.selectedPlay$.pipe(
      // tap(selectedPlay => console.log('selectedPlay', selectedPlay)),
      map((selectedPlay: Play) => {
        return selectedPlay.characters;
      }),
      // tap(characters => console.log('characters', characters)),
      switchMap(characters => {
        return interval(500).pipe(
          map(integer => integer % 2 ? false : true),
          map(flashingBoolean => characters.map(character => {
            if (character.dead && flashingBoolean) {
              character.displayDeathState = true;
            }
            if (character.dead && !flashingBoolean) {
              character.displayDeathState = false;
            }
            return character;
          }))
        );
      }),
      // tap(characters => console.log('mergeMapped characters', characters))
    );
  }

  getPlays(): Observable<Play[]> {
    const playsObservable$ = this.http.get('assets/dummy-response/plays.json')
    .pipe(
      // tap(dummyResponse => console.log('dummyResponse', dummyResponse)),
      map(response => response.json()),
      // tap(parsedDummyResponse => console.log('parsedDummyResponse', parsedDummyResponse)),
      map(plays => {
        return plays.map(play => {
          return {
            title: play.title,
            characters: play.characters.map(character => {
              return {
                name: character.name,
                dead: !!character.dead, // Convert a number to a boolean
                displayDeathState: !!character.displayDeathState, // Convert a number to a boolean
              };
            })
          };
        });
      }),
      // tap(convertedToPlay => console.log('convertedToPlay', convertedToPlay))
    );

    playsObservable$.subscribe(plays => this.updatePlays(plays));
    return playsObservable$;
  }

  updatePlays(plays: Play[]): void {
    this._plays.next(plays);
  }

  updateSelectedPlay(selectedPlayTitle: string): void {
    this.plays$.subscribe(plays => {
      this._selectedPlay.next(plays.find(play => play.title === selectedPlayTitle));
    });
  }

  updateSelectedCharacter(character: Character): void {
    this._selectedCharacter.next(character);
  }

  eliminateSelectedCharacter(): void {
    this.selectedCharacter$.pipe(
      take(1) // Necessary to avoid blowing the call stack
    ).subscribe(character => {
      character.dead = true;
      this.updateSelectedCharacter(character);
    });
  }

}
