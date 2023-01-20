export class User {
    id?: number;
    first_name?: string;
    last_name?: string;
    user_name: string;
    password: string;
    constructor () {
        this.first_name=""
        this.last_name=''
        this.user_name=""
        this.password=""
    }
}