import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Playlist } from '../classes/playlist';
import { Playlists } from '../classes/playlists';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  playlistsCache: {
    [key: string]: Playlist[]
  } = {};

  constructor(
    private http: HttpClient,
  ) { }

  fetchData(key: string) {
    return this.http.get(environment.apiUrl + `screen/playlistItems/${key}`).toPromise() as Promise<Playlists>;
  }

  async getPlaylists(key: string) {
    if (!this.playlistsCache[key]) {
      const playlists = await this.fetchData(key);
      this.playlistsCache[key] = playlists.playlists;
    }
    return this.playlistsCache[key];
  }
}
