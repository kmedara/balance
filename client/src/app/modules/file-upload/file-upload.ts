import { Component, inject } from '@angular/core';
import { FileUploadService } from '@modules/file-upload/file-upload.service';

@Component({
  selector: 'app-file-upload',
  imports: [],
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.scss',
})
export class FileUpload {
  selectedFile!: File;
  uploadService = inject(FileUploadService);

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("selected")
  }

  onUpload() {
    if (!this.selectedFile) return;

    this.uploadService.uploadExcel(this.selectedFile)
  }
}
