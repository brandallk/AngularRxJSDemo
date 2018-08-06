export class Play {
  title = '';
  characters: Character[] = [];
}

export class Character {
  name = '';
  dead = false;
  displayDeathState = true;
}
