import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Profile } from "../models/profile.model";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { ProfilePage } from '../models/profile-page.model';

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  private apiURL: string = environment.apiURL + "/api/profiles";

  save(profile: Profile): Observable<Profile> {
    return this.http.post<Profile>(this.apiURL, profile);
  }

  getAll(page, size): Observable<ProfilePage> {
    const params = new HttpParams().set("page", page).set("size", size);
    return this.http.get<ProfilePage>(`${this.apiURL}?${params.toString()}`);
  }

  favorite(profile: Profile): Observable<Profile> {
    return this.http.patch<Profile>(
      `${this.apiURL}/${profile.id}/favorite`,
      null
    );
  }

  upload(profile: Profile, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiURL}/${profile.id}/photo`, formData, {
      responseType: "blob",
    });
  }
}
