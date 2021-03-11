/**
 * Wrapper for api fetch calls.
 *
 * - Note -
 *  This is a very quick implementation for the purpose of implementing the services and frontend.
 *  It will eventually be replaced by the newer version.
 *
 * - Reference -
 * Docs: https://github.com/reddit-archive/reddit/wiki/JSON
 *
 * Types:
 * t1_  Comment
 * t2_  Account
 * t3_  Link
 * t4_  Message
 * t5_  Subreddit
 * t6_  Award
 *
 * Parameters:
 * t(ime)
 * limit
 * after
 *
 * Example:
 * top.json?t=today&limit=25&after=t3_ld4pu8
 */

// Interface for single post.
export interface RedditPost {
  name: string,
  url: string,
  title: string,
  author: string,
  permalink: string,
  ups: number,
  downs: number,
  num_comments: number,
  created_utc: number,
  over_18: boolean,
  thumbnail: string,
  post_hint?: string,
  selftext: string,
  selftext_html: string,
  subreddit: string,
  subreddit_name_prefixed: string,
  link_flair_text: string,
  link_flair_text_color: string,
  link_flair_background_color: string,
  preview?: {
    images: Array<{
      source: {
        url: string,
      }
      variants?: {
        gif: {
          source: {
            url: string,
          }
        }
      }
    }>
  },
  all_awardings: Array<{
    count: number,
  }>,
}

// Interface for API response.
export interface RedditListing {
  kind: "Listing"
  data: {
    modhash: string,
    dist: number,
    children: {
      kind: 't3',
      data: RedditPost,
    }[],
    after: null | string,
    before: null | string,
  }
}

const FetchApi = async (subReddit: string = 'popular', loadAfter: boolean | string = false): Promise<RedditPost[]> => {
  let url = process.env.REACT_APP_API_URL + subReddit + '.json?limit=25&raw_json=1'
  if (loadAfter) url += '&after=' + loadAfter

  const response = await fetch(url)

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

  const listing: RedditListing = await response.json()

  return listing.data.children.map(post => post.data)
}

export {FetchApi as default}
