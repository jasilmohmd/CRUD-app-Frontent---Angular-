import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../Model/UserCredentials';
import { CommonModule } from '@angular/common';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ProfileUploadService } from '../../../services/profile-upload.service';
import { UserAuthService } from '../../../services/user-auth.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  faUpload = faUpload;
  faPencilAlt = faPencilAlt;
  isUploading: boolean = false; 

  @ViewChild('fileInput') fileInput!: ElementRef; 

  data: User = { _id:'', email: '', name: '', password: '' , profilePicture: ''};

  constructor(private http: HttpClient, private router: Router) {}

  profileUploadService = inject(ProfileUploadService);
  userAuthService = inject(UserAuthService);
  
  ngOnInit(): void {
    

    const token: string = localStorage.getItem('user') ?? '';
    console.log(token);
    

    this.userAuthService.getUser(token).subscribe((res:any) => {

      setTimeout(() => {
        this.data.email = res.email;
        this.data.name = res.name;
        this.data.profilePicture = res.profilePicture;
        
      }, 1000);
      
      
    })

  }

  //  // Method to trigger file input click
  //  triggerFileInput(): void {
  //   this.fileInput.nativeElement.click()
  // }

  // Handle the file upload
  onFileSelected(event: any): void {
    console.log("got it");
    const file: File = event.target.files[0];
    if (file) {
      this.uploadFile(file);
    }
  }

  uploadFile(file: File): void {

    const token: string = localStorage.getItem('user') as string;

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
      
          this.profileUploadService.uploadToDb(token,downloadURL).subscribe( res => {
            
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
