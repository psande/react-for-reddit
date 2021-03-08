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
enum FetchingState {
  Loading,
  Done,
  Error,
}

const HomePage = () => {
  // State
  const [posts, setPosts] = useState<RedditPost[]>([])
  const [fetching, setFetching] = useState<FetchingState>(FetchingState.Loading)

  // Fetch posts
  const getPosts = async (searchTerm: string) => {
    try {
      setFetching(FetchingState.Loading)
      const posts = await FetchApi(searchTerm ? searchTerm : 'popular')
      setPosts(posts)
      setFetching(FetchingState.Done)
    } catch (err) {
      setFetching(FetchingState.Error)
    }
  }

  // Fetch posts on component mount
  useEffect(() => {
    getPosts('popular')
  }, [])

  // Main content switch based on fetching
  const MainContent:React.FC = () => {
    switch (fetching) {
      case FetchingState.Loading:
        return <Loading/>
      case FetchingState.Error:
        return <ErrorMsg/>
      case FetchingState.Done:
        return (
          <div className='HomePage_posts'>
            {posts.map(post => <PostCard key={post.name} post={post}/>)}
          </div>
        )
    }
  }

  return (
    <div className='HomePage'>
      <ActionsBar filterBySub={getPosts}/>
      <MainContent />
    </div>
  )
}

export default HomePage
