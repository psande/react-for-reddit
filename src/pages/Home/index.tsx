/**
 * Posts page.
 *
 * The difference between a page and a regular component is that it has business logic and API calls.
 * Allows for a clear separation of concerns, improved re-usability and code splitting based on routes.
 */

// Libraries
import React, {useState, useEffect} from 'react'

// API
import FetchApi, {RedditPost} from '../../api/FetchApi'

// Components
import ActionsBar from "../../components/ActionsBar"
import PostCard from "../../components/PostCard"
import Loading from '../../components/Loading'
import ErrorMsg from '../../components/ErrorMsg'

// Styles
import './HomePage.scss'

// Types
type FetchingState = 'loading' | 'done' | 'error'


const HomePage = () => {
  // State
  const [posts, setPosts] = useState<RedditPost[]>([])
  const [fetching, setFetching] = useState<FetchingState>('loading')

  // Fetch posts
  const getPosts = async (searchTerm: string) => {
    try {
      setFetching('loading')
      const posts = await FetchApi(searchTerm ? searchTerm : 'popular')
      setPosts(posts)
      setFetching('done')
    } catch (err) {
      setFetching('error')
    }
  }

  // Fetch posts on component mount
  useEffect(() => {
    getPosts('popular')
  }, [])

  return (
    <div className='HomePage'>
      <ActionsBar filterBySub={getPosts}/>
      {{
        'loading': <Loading/>,
        'error': <ErrorMsg/>,
        'done':
          <div className='HomePage_posts'>
            {posts.map(post => <PostCard key={post.name} post={post}/>)}
          </div>
      }[fetching]}
    </div>
  )
}

export default HomePage
