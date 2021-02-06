/**
 * Posts page.
 *
 * The difference between a page and a regular component is that it has business logic and API calls.
 * Allows for a clear separation of concerns, improved re-usability and code splitting based on routes.
 */

// Libraries
import {useState, useEffect} from 'react';

// API
import FetchApi from '../../api/FetchApi';

// Components
import ActionsBar from "../../components/ActionsBar";
import PostCard from "../../components/PostCard";
import Loading from '../../components/Loading';
import ErrorMsg from '../../components/ErrorMsg';

// Styles
import './HomePage.scss';


const HomePage = () => {
  // State.
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState('loading');

  // Fetch posts.
  const getPosts = async (params = {search: 'popular'}) => {
    try {
      setFetching('loading');
      const posts = await FetchApi(params.search);
      setPosts(posts);
      setFetching('posts');
    } catch (err) {
      setFetching('error');
    }
  }

  // Fetch posts on component mount.
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='HomePage'>
      <ActionsBar filter={getPosts}/>
      {{
        'loading': <Loading/>,
        'error': <ErrorMsg/>,
        'posts':
          <div className='HomePage_posts'>
            {posts.map(post => <PostCard key={post.name} post={post}/>)}
          </div>
      }[fetching]}
    </div>
  )
};

export default HomePage;
