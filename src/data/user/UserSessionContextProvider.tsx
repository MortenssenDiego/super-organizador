import { UserCredential } from "@firebase/auth";
import React, { useState } from "react";
import UserSessionContext, { IUserSession, UserSessionModel } from "./user-session-context";

const UserSessionContextProvider: React.FC = (props) => {

    const [user, setUser] = useState<IUserSession>(
        {
            uid: '',
            displayName: '',
            email: '',
            photoURL: ''
        }
    );

    const signInWithGoogle = (user: UserCredential) => { 
        const newUserSession: IUserSession = {
            uid: user.user.uid,
            displayName: user.user.displayName || '',
            email: user.user.email || '',
            photoURL: user.user.photoURL || ''
        }

        setUser(newUserSession);
    };

    const userSessionContext: UserSessionModel = {
        user,
        signInWithGoogle
    };

    return (
        <UserSessionContext.Provider value={userSessionContext} >
            {props.children}
        </UserSessionContext.Provider>
    );
};

export default UserSessionContextProvider;