import { createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig';

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setPosts, setStatus, setError } = postsSlice.actions;

export const fetchPosts = () => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const response = await getDocs(collection(db, 'posts'));
        const postsArray = response.docs.map(doc => ({
            id: doc.id,
            title: doc.data().title,
            message: doc.data().message,
            author: doc.data().author,
        }));
        dispatch(setPosts(postsArray));
        dispatch(setStatus('succeeded'));
    } catch (error) {
        dispatch(setError(error.toString()));
        dispatch(setStatus('failed'));
    }
};

export default postsSlice.reducer;