import React from "react";

export interface IUserSession {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

export interface UserSessionModel {
    user: IUserSession;
    signInWithGoogle: (user: any) => void;
}

const UserSessionContext = React.createContext<UserSessionModel>({
    user: {
        uid: '',
        displayName: '',
        email: '',
        photoURL: ''
    },
    signInWithGoogle: (user: any) => {}
})

export default UserSessionContext;