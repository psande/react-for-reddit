/**
 * Wrapper for api fetch calls.
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

const FetchApi = async (subReddit = 'popular', loadAfter = false) => {
  let url = 'https://www.reddit.com/r/' + subReddit + '.json?limit=25&raw_json=1';
  if (loadAfter) url += '&after=' + loadAfter;

  let response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  response = await response.json();

  return response.data.children.map(post => post.data);
}

export default FetchApi;
