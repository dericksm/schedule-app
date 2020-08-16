import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Profile } from '../../models/profile.model';

@Component({
  selector: 'profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProfileDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public profile: Profile
  ) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close()
  }

}
