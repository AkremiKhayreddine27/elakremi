export interface User {
    uid: string,
    email: string,
    firstname?: string,
    lastname?: string,
    phone?: string,
    password?: string,
    role?: any;
    displayName?: string;
    photoURL?: string;
}
