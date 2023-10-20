import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortName',
})
export class ShortNamePipe implements PipeTransform {
  transform(completeName: string): string {
    const namesFirstLetters = completeName
      .trim()
      .toUpperCase()
      .split(' ')
      .map((name) => name[0]);
    switch (namesFirstLetters.length) {
      case 0:
        return 'N/A';
      case 1:
        return completeName.slice(0, 2);
      case 2:
        return namesFirstLetters.slice(0, 2).join('');
      default:
        return namesFirstLetters[0] + namesFirstLetters[namesFirstLetters.length - 2];
    }
  }
}
