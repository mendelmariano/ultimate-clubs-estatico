export class UserList {

    currentPage: number;
            totalPages: number;
            totalCount: number;
            users: [
               User
            ]


}

export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    profile: {
        name: string;
        id: number,
    },
    profile_id: number;
}
