import { useDispatch, useSelector } from 'react-redux';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './../firebase/firebaseConfig';
import { fetchPosts } from './../store/postsSlice';

export const PostCard = ({post}) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.authState.user);

    const handleDelete = async () => {
        try {
            const postDocRef = doc(db, 'posts', post.id);
            await deleteDoc(postDocRef);
            dispatch(fetchPosts());
        } catch (error) {
            console.error("Error deleting post: ", error);
            alert("Error deleting post, please try again.");
        }
    };

    return (
        <section className="card">
            <p className="title">{post.title}</p>
            <p className="description">{post.message}</p>
            <p className="control">
                <span className="author">{post.author}</span>
                { user && user.displayName === post.author ? (
                    <span className="delete" onClick={handleDelete}><i className="bi bi-trash3"></i></span>
                ) : null}
            </p>
        </section>
    )
}
