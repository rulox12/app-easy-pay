import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  public url = environment.api;

  constructor(
    private http: HttpClient,
  ) {
  }

  addFavorite(request) {
    return this.http.post<any>(this.url + 'favorite/add', request);
  }

  deleteFavorite(request: { commerce: any; user: any }) {
    return this.http.post<any>(this.url + 'favorite/delete', request);
  }

  existFavorite(request: { commerce: any; user: any }) {
    return this.http.post<any>(this.url + 'favorite/exists', request);
  }

  getAllFavorites(user: any) {
    // eslint-disable-next-line no-underscore-dangle
    return this.http.get<any>(this.url + 'favorite/get-all/' + user._id);
  }
}
