import { Injectable } from '@angular/core';


@Injectable()
export class JwtService {

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  // ============ Laravel =============

  getTokenLaravel(): String {
    console.log("RETURN TOKEN");
    return window.localStorage['jwtTokenLaravel'];
  }

  saveTokenLaravel(token: String) {
    window.localStorage['jwtTokenLaravel'] = token;
  }

  destroyTokenLaravel() {
    window.localStorage.removeItem('jwtTokenLaravel');
  }
}
