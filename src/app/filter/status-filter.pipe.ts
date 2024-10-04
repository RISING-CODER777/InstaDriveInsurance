// filter/status-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusFilter'
})
export class StatusFilterPipe implements PipeTransform {
  transform(items: any[], status: string): any[] {
    if (!items || !status) {
      return items;
    }
    return items.filter(item => item.status === status);
  }
}
