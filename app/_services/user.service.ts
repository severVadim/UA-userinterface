import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };

    httpOptionsWithToken = {
        headers: new HttpHeaders({
            'Content-Type':  'application/json'
        })
    };
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    getById(id: number) {
        return this.http.get('/api/users/' + id);
    }

    create(user: User) {
        console.log(user)
        return this.http.post("http://localhost:8077/users/register", user, this.httpOptions);
    }

    confirmUser(token: string) {
        return this.http.get('http://localhost:8077/users/confirm', {
            headers: new HttpHeaders({
                'Authorization':  'Bearer ' + token
            })
        });
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }
}