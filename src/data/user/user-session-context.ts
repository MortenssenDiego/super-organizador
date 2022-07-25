import { UserCredential } from "firebase/auth";
import React from "react";

export interface IUserSession {
    uid: string;
    displayName: string;
    email: string;
    photoURL: string;
}

export interface UserSessionModel {
    user: IUserSession;
    signInWithGoogle: (user: UserCredential) => void;
}

const UserSessionContext = React.createContext<UserSessionModel>({
    user: {
        uid: '',
        displayName: '',
        email: '',
        photoURL: ''
    },
    signInWithGoogle: (user: UserCredential) => {}
})

export default UserSessionContext;