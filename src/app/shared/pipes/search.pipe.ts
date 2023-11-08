import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], query: string, fields: string[] = []): any[] {
    if (!items) return [];
    if (!query) return items;
    // If no fields are provided, search in all fields
    if (fields.length === 0) {
      return items.filter(item => {
        for (const key in item) {
          if (item.hasOwnProperty(key) && item[key].toString().toLowerCase().includes(query.toLowerCase())) {
            return true;
          }
        }
        return false;
      });
    }
    // If fields are provided, search in the provided fields
    return items.filter(item => {
      return fields.some(field => {
        return item[field] && item[field].toString().toLowerCase().includes(query.toLowerCase());
      });
    });
  }

}
