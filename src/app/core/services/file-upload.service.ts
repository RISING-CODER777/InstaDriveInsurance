import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private storage: AngularFireStorage) {}

  // Push file to storage and return an observable that emits the upload progress and the download URL
  pushFileToStorage(fileUpload: FileUpload): Observable<number | string> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    return new Observable<number | string>((observer) => {
      // Subscribe to both percentage and state changes of the upload task
      uploadTask
        .percentageChanges()
        .subscribe((percentage) => {
          if (percentage !== undefined) {
            observer.next(percentage); // Emit the upload progress percentage
          }
        });

      uploadTask.snapshotChanges().subscribe({
        complete: () => {
          // Once upload completes, get the download URL
          storageRef.getDownloadURL().subscribe(
            (downloadURL) => {
              fileUpload.url = downloadURL; // Store the download URL in the FileUpload model
              fileUpload.name = fileUpload.file.name;
              observer.next(downloadURL); // Emit the download URL
              observer.complete(); // Complete the observable
            },
            (error) => {
              observer.error(error); // Handle any errors in getting the download URL
            }
          );
        },
      });
    });
  }

  // Delete file from storage and optionally handle database removal
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileStorage(fileUpload.name);
    // TODO: Add logic to remove the URL from the database if required
  }

  // Delete file by its name in storage
  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete().subscribe({
      next: () => console.log(`File ${name} deleted successfully.`),
      error: (err) => console.error('Error deleting file:', err),
    });
  }
}
