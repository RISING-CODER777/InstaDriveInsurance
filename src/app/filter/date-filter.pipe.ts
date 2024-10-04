import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFilter'
})
export class DateFilterPipe implements PipeTransform {
  transform(items: any[], date: Date | null): any[] {
    if (!items || !date) {
      return []; // or return items to keep all
    }
    return items.filter(item => {
      const itemDate = new Date(item.requestDate);
      return itemDate.toDateString() === date.toDateString();
    });
  }
}
