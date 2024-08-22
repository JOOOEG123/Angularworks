import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor() {}

  flattenObject(obj: any, parentKey = '', separator = '.'): any {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = parentKey ? `${parentKey}${separator}${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
        Object.assign(acc, this.flattenObject(obj[key], newKey, separator));
      } else if (Array.isArray(obj[key])) {
        obj[key].forEach((item, index) => {
          Object.assign(acc, this.flattenObject({ [`${newKey}[${index}]`]: item }));
        });
      } else {
        acc[newKey] = obj[key];
      }
      return acc;
    }, {});
  }

  convertToCSV<T>(objArray: T[], options: CsvOptions = {}): string {
    const {
      delimiter = ',',
      quoteStrings = true,
      lineDelimiter = '\n',
      includeHeaders = true
    } = options;

    if (!objArray.length) {
      return '';
    }

    const flattenedArray = objArray.map(item => this.flattenObject(item));
    const headers = Object.keys(flattenedArray[0]);
    const csvArray = includeHeaders ? [headers] : [[]];
    
    csvArray.push(flattenedArray.map(row => {
      return headers.map(field => {
        let value = row[field as keyof typeof row];
        if (value == null) value = ''; // Handle null or undefined values
        value = String(value).replace(/"/g, '""'); // Escape double quotes

        return quoteStrings ? `"${value}"` : value;
      }).join(delimiter);
    }));

    return csvArray.join(lineDelimiter);
  }

  downloadCSV<T>(data: T[], filename: string = 'data.csv', options: CsvOptions = {}): void {
    try {
      const csvData = this.convertToCSV(data, options);
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  }
}

export interface CsvOptions {
  delimiter?: string;
  quoteStrings?: boolean;
  lineDelimiter?: string;
  includeHeaders?: boolean;
}
