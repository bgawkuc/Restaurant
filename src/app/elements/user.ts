export class User {
    constructor(
        public nick: string,
        public email: string,
        public isAdmin: boolean,
        public isManager: boolean,
        public isCustomer: boolean,
        public isBanned: boolean,
    ) { }
}