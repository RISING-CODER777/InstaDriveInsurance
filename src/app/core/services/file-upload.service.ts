import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/uploads';

  constructor(private storage: AngularFireStorage) { }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }


  deleteFile(fileUpload: FileUpload): void {
    
        this.deleteFileStorage(fileUpload.name);
        // TODO: Add then and catch while delete also remove the url from database
        // While updating the existing user profile delete the old and add the new one
  }


  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
