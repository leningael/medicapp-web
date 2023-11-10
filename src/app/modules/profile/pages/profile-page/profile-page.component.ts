import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css'],
})
export class ProfilePageComponent {
  imageUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.imageUrl = reader.result as string;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
