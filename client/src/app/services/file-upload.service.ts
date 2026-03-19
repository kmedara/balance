import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { utils, read } from 'xlsx';
import { isBudget } from '@__types/guards'
@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private apiUrl = 'http://localhost:3000/upload'; // your backend

  constructor(private http: HttpClient) { }

  async uploadExcel(file: File) {
    console.log("uploading", file)
    const workbook = read(await file.arrayBuffer());
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = utils.sheet_to_json(sheet);

    if(data.some(el => !isBudget)) {
      throw Error("Invalid data");
    }
    const d = data.map((el:any) => {
      const newObj = Object.fromEntries(
        Object.entries(el).map(([k, v]) => [k.toLowerCase(), v])
      );
      return newObj;
    })
    console.log(d);
  }
}