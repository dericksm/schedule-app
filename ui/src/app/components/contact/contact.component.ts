import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Profile } from "../../models/profile.model";
import { ProfileService } from "../../services/profile.service";
import { ProfileDetailComponent } from "../profile-detail/profile-detail.component";

@Component({
  selector: "contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  public formGroup: FormGroup;
  public profiles: Profile[] = [];
  public displayedColumns: string[] = [
    "photo",
    "id",
    "name",
    "email",
    "favorite",
  ];

  public totalElements: number = 0;
  public page: number = 0;
  public size: number = 10;
  public pageSizeOptions: number[] = [10];

  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.profileService.getAll(this.page, this.size).subscribe((res) => {
      this.profiles = res.content;
      this.totalElements = res.totalElements;
      this.page = res.number;
    });
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  favorite(profile: Profile) {
    this.profileService.favorite(profile).subscribe((res) => {
      profile.favorite = !profile.favorite;
    });
  }

  uploadPhoto(event, profile: Profile) {
    const files = event.target.files;
    if (files) {
      const photo = files[0];
      const formData: FormData = new FormData();
      formData.append("photo", photo);
      this.profileService.upload(profile, formData).subscribe((res) => {
        this.listProfiles(this.page, this.size);
      });
    }
  }

  listProfiles(page = 0, size = 10) {
    this.profileService.getAll(page, size).subscribe((res) => {
      this.profiles = res.content;
      this.totalElements = res.totalElements;
      this.page = res.number;
      this.profiles = [...this.profiles];
    });
  }

  submit() {
    const c: Profile = this.formGroup.value;
    this.profileService.save(c).subscribe((res) => {
      this.profiles.push(res);
      this.listProfiles(this.page, this.size);
      this.snackBar.open("Perfil adicionado", "Sucesso", {
        duration: 2000,
      });
      this.formGroup.reset();
    });
  }

  showProfile(profile: Profile) {
    this.dialog.open(ProfileDetailComponent, {
      width: "400px",
      height: "450px",
      data: profile,
    });
  }

  paginator(event: PageEvent) {
    this.page = event.pageIndex;
    this.listProfiles(this.page, this.size);
  }
}
