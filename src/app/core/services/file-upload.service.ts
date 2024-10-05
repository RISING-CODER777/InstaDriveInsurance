import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable, of } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private storage: AngularFireStorage) {}

  // Push file to storage and return the download URL as an observable
  pushFileToStorage(fileUpload: FileUpload): Observable<string> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    // Observable for upload progress
    return new Observable<string>((observer) => {
      // Track progress using the upload task's percentageChanges
      uploadTask.percentageChanges().subscribe((percentage) => {
        // Emit progress updates if needed
        observer.next(`Upload is ${percentage}% done`);
      });

      uploadTask.snapshotChanges()
        .pipe(
          finalize(() => {
            storageRef.getDownloadURL().subscribe(
              (downloadURL) => {
                fileUpload.url = downloadURL;
                fileUpload.name = fileUpload.file.name;
                observer.next(downloadURL); // Emit the download URL
                observer.complete(); // Complete the observable
              },
              (err) => {
                observer.error(err); // Handle any errors
              }
            );
          })
        ).subscribe();
    });
  }

  // Delete file from storage and optionally handle database removal
  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileStorage(fileUpload.name);
    // TODO: Add logic to remove the URL from the database if required
    // Ensure the old file is deleted when updating user profile
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
