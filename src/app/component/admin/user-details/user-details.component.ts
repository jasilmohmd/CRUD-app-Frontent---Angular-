import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../Model/UserCredentials';
import { CommonModule } from '@angular/common';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ProfileUploadService } from '../../../services/profile-upload.service';
import { UserAuthService } from '../../../services/user-auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule,RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  faPencilAlt = faPencilAlt
  faUpload = faUpload
  isUploading: boolean = false;

  data:User = { _id:'', email: '', name: '', password: '' , profilePicture: '' }

  constructor ( private http: HttpClient ) {}

  profileUploadService = inject(ProfileUploadService);
  adminAuthService = inject(AdminAuthService);
  route = inject(ActivatedRoute)

  ngOnInit(): void {
    

    const token: string = localStorage.getItem('admin') ?? '';

  
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);

    this.adminAuthService.getUser(token,id!).subscribe((res:any) => {
      
      setTimeout(() => {
        this.data = res.user;
      }, 0);

    })

  }

  // Handle the file upload
  onFileSelected(event: any): void {
    console.log("got it");
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {

    const token: string = localStorage.getItem('admin') as string;

    const storage = getStorage();
    const storageRef = ref(storage, 'profile-pictures/' + file.name);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        // Handle progress, e.g., show a progress bar
        this.isUploading = true;
      }, 
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed', error);
      }, 
      () => {
        // Handle successful uploads
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          this.isUploading = false;
      
          this.profileUploadService.uploadToDbAdmin( token, this.data._id, downloadURL ).subscribe( res => {
            
            // this.data.profilePicture = downloadURL;
            console.log(res) 
          });
          console.log('File available at', downloadURL);
          this.data.profilePicture = downloadURL;
          
          // You can now use the download URL, e.g., save it to the user's profile in your database
        });
      }
    );
  }

}
