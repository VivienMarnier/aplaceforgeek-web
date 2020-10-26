export class User{

    constructor(token: string){
        this.token = token;
    }

    token: string;
    email: string;
    roles: [];
}