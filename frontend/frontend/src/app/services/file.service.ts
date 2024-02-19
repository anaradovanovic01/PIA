import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  uri = 'http://localhost:8080/files';

  uploadFile(file: File) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.uri}/uploadFile`, formData, {responseType: 'text' as 'json'} );
  }

  getImageFile(path: string): Observable<File> {
    return this.http.get(path, { responseType: 'arraybuffer' }).pipe(
        map((data: ArrayBuffer) => {
          const blob = new Blob([data], { type: 'image/png' });
          const fileName = path.substring(path.lastIndexOf('/') + 1);
          const file: File = new File([blob], fileName, { type: 'image/png' });
          return file;
        })
      );
  }

  fetchPdf(filename: string): Observable<Blob> {
    return this.http.post(`${this.uri}/download`, filename, { responseType: 'blob' });
  }
  
}
