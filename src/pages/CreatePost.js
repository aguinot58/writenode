import { useTitle } from '../hooks/useTitle'
import { collection, addDoc } from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchPosts } from './../store/postsSlice';

export const CreatePost = () => {

    useTitle('Create Post');

    const dispatch = useDispatch();
    const postsCollectionRefs = collection(db, 'posts');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const user = useSelector(state => state.authState.user);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        console.log("test");
        e.preventDefault();
        if (title && message) {
            try {
                await addDoc(postsCollectionRefs, {
                    title: title,
                    message: message,
                    author: user.displayName
                });
                setTitle('');
                setMessage('');
                dispatch(fetchPosts());
                navigate('/');
            } catch (error) {
                console.error("Error creating post: ", error);
                alert("Error creating post, please try again.");
            }
        } else {
            alert("Please fill in both the title and message fields.");
        }
    }

    return (
        <main>
            <section className="create">
                <div className="heading">Add New Post</div>
                <form className="createPost" onSubmit={onSubmit}>
                    <input 
                        className="title" 
                        type="text" 
                        name="title" 
                        placeholder="Titre" 
                        maxLength="50" 
                        required 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                        className="description" 
                        type="text" 
                        name="message" 
                        placeholder="Message" 
                        maxLength="600" 
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <button className="submit" type="submit">Create</button>
                </form>
            </section>
        </main> 
    )
}