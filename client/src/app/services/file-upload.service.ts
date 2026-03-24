import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { utils, read } from 'xlsx';
import { isBudget } from '@kmedara/balance-domain/domain/guards';
import { Budget } from '@kmedara/balance-domain/domain/budget/budget';
@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private apiUrl = 'http://localhost:3000/upload'; // your backend
  private http = inject(HttpClient);

  async uploadExcel(file: File) {
    console.log('uploading', file);
    const workbook = read(await file.arrayBuffer());
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(sheet) as Array<Budget>;

    if (data.some((el) => !isBudget(el))) {
      throw Error('Invalid data');
    }
    const d = data.map((el: any) => {
      const newObj = Object.fromEntries(
        Object.entries(el).map(([k, v]) => [k.toLocaleLowerCase(), v]),
      );
      return newObj;
    });
    console.log(d);
  }
}
