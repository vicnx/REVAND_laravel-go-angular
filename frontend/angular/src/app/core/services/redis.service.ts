import { Injectable } from '@angular/core';
import { ApiService } from './api.service';


@Injectable()
export class RedisService {

  constructor (
    private api: ApiService
  ) {}

  set(body: Object = {}) {
    return this.api.post("/redis/",'redis', body).subscribe(
        data => {
          return data
        },
        err => console.log(err)
      );
  }

  get(key: string) {
    return this.api.get("/redis/"+key,'redis').subscribe(
        data => {
          return data
        },
        err => console.log(err)
    )
  }

  getAll() {
    return this.api.get("/redis/",'redis').subscribe(
        data => {
          console.log(data)
          return data
        },
        err => console.log(err)
    )
  }


}
