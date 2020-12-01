import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    console.log("RETURN TOKEN");
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
