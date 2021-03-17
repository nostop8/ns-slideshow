import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft'
})
export class TimeLeftPipe implements PipeTransform {

  transform(value: string | number, ...args: unknown[]): unknown {
    if (+value < 0) {
      return '00:00:00';
    }
    const seconds = +value;
    const hh = Math.floor(seconds / 3600);
    const mm = Math.floor(seconds / 60) % 60;
    const ss = seconds % 60;

    return [hh, mm, ss]
      .map(value => value < 10 ? '0' + value : value)
      .join(':');
  }

}
