export interface PostInterface {
    id: number;
    postImage: string;
    title: string;
    date: string;
    content: string;
}

export interface PostDetailsInterface extends PostInterface {
    username: string;
}

export interface UserInterface {
    id: number;
    email: string;
    password: string;
    name: string;
    username: string;
    profileImage: string;
    joinDate: string;
}