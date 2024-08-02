import { createSlice } from '@reduxjs/toolkit';
import { auth } from './../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuth: false,
        user: null
    },
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.isAuth = false;
            state.user = null;
        }
    }
});

export const { setAuth, clearAuth } = authSlice.actions;

export const handleGoogleAuth = () => async (dispatch) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            dispatch(setAuth({ isAuth: true, user: result.user }));
        }).catch((error) => {
            console.log(error);
        });
};

export const handleSignOut = () => async (dispatch) => {
    signOut(auth)
        .then(() => {
            dispatch(clearAuth());
        }).catch((error) => {
            console.log(error);
        });
};

export const checkAuthState = () => (dispatch) => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(setAuth({ isAuth: true, user }));
        } else {
            dispatch(clearAuth());
        }
    });
};

export default authSlice.reducer;