import { useTitle } from '../hooks/useTitle'
import { useEffect, useState } from 'react'
import { PostCard } from './../components/PostCard'
import { useSelector, useDispatch } from 'react-redux';
import { checkAuthState } from './../store/authSlice';
import { fetchPosts } from './../store/postsSlice';

export const Home = () => {

    useTitle('Home');

    const isAuth = useSelector(state => state.authState.isAuth);
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const postStatus = useSelector(state => state.posts.status);
    const postError = useSelector(state => state.posts.error);

    useEffect(() => {
        // Check authentication state on component mount
        dispatch(checkAuthState());
    }, [dispatch, isAuth]);


    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [dispatch, postStatus]);

    return (
        <main>
            <section className="card">
                {
                    postStatus === 'loading' ? (
                        <p>Loading posts...</p>
                    ) : postStatus === 'failed' ? (
                        <p>Error loading posts: {postError}</p>
                    ) : (
                        posts.map(post => (
                            <PostCard key={post.id} post={post}/>
                        ))
                    )
                }
            </section>
        </main> 
    )
}