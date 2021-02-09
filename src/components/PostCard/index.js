/**
 * Content card for Post.
 * Docs: https://github.com/reddit-archive/reddit/wiki/JSON
 */

// Libraries
import moment from 'moment';
import numeral from 'numeral';

// Styles
import './PostCard.scss';

// Assets
import {ReactComponent as UpVotesIcon} from '../../assets/icons/arrow-up-circle.svg';
import {ReactComponent as CommentsIcon} from '../../assets/icons/message-square.svg';
import {ReactComponent as GoldIcon} from '../../assets/icons/hexagon.svg';
import {ReactComponent as ExternalLink} from '../../assets/icons/external-link.svg';
import {ReactComponent as PlayIcon} from '../../assets/icons/play.svg';
// import LinkIcon from '../../assets/icons/link.svg';

const PostCard = props => {
  const {post} = props;
  const reddit_url = 'https://www.reddit.com';

  // Links.
  const urlLink = post.url;
  const subRedditLink = reddit_url + '/r/' + post.subreddit;
  const authorLink = reddit_url + '/u/' + post.author;
  const permaLink = reddit_url + post.permalink;

  // Label at the left of title.
  const linkFlairColors = {
    color: post.link_flair_text_color === 'light' ? 'LinkFlair--light' : 'LinkFlair--dark',
    backgroundColor: post.link_flair_background_color,
  };

  // Construct the content.
  let previewUrl;
  let linkUrl;
  let contentText;
  //let thumbUrl;
  let isVideo;
  switch (true) {

    // Shows markup/html content post.
    case !!post.selftext:
      linkUrl = false;
      previewUrl = false;
      contentText = post.selftext_html;
      //thumbUrl = false;
      isVideo = false;
      break;

    // Internal Reddit link. ie: AskReddit
    case post.thumbnail === 'self':
      linkUrl = false;
      previewUrl = false;
      contentText = false;
      //thumbUrl = false;
      isVideo = false;
      break;

    // Points to comments to avoid spoilers with spoilers tag.
    case post.thumbnail === 'spoiler':
      linkUrl = false;
      previewUrl = false;
      contentText = false;
      //thumbUrl = false;
      isVideo = false;
      break;

    // Link with a default thumbnail.
    case post.thumbnail === 'default':
      linkUrl = true;
      previewUrl = false;
      contentText = false;
      //thumbUrl = LinkIcon;
      isVideo = false;
      break;

    // Show preview for image.
    case post.post_hint === 'image':
      linkUrl = false;
      previewUrl = post.preview.images[0].variants?.gif
        ? post.preview.images[0].variants.gif.source.url
        : post.preview.images[0].source.url;
      contentText = false;
      //thumbUrl = false;
      isVideo = false;
      break;

    // Show preview for Reddit hosted video.
    case post.post_hint === 'hosted:video':
      linkUrl = false;
      previewUrl = post.preview.images[0].source.url;
      contentText = false;
      //thumbUrl = false;
      isVideo = true;
      break;

    // Show preview for external video. ie: YouTube.
    case post.post_hint === 'rich:video':
      linkUrl = false;
      previewUrl = post.preview.images[0].source.url;
      contentText = false;
      //thumbUrl = false;
      isVideo = true;
      break;

    // By default we show a link and a thumbnail.
    default:
      linkUrl = true;
      previewUrl = false;
      contentText = false;
      // thumbUrl = post.thumbnail;
      isVideo = false;
  }

  // Awards counter.
  const awardsCount = post.all_awardings.reduce((count, award) => award.count + count, 0);

  let awardsColor;
  switch (true) {
    case awardsCount >= 100:
      awardsColor = 'red';
      break;
    case awardsCount >= 30:
      awardsColor = 'yellow';
      break;
    case awardsCount >= 10:
      awardsColor = 'green';
      break;
    default:
      awardsColor = 'gray';
  }

  return (
    <div className='PostCard'>

      {/*SubReddit, Author and flair, Date*/}
      <div className='PostCard__top'>
        <a target='_blank' rel='noreferrer' href={subRedditLink}>{post.subreddit_name_prefixed}</a>
        <span>•</span>
        <span>Posted by <a href={authorLink} target='_blank' rel='noreferrer'>{`u/${post.author}`}</a> </span>
        <span>{moment.unix(post.created_utc).fromNow()}</span>
      </div>

      {/*Link Flair, Title and NSFW tag*/}
      <div className='PostCard__title'>
        {post.link_flair_text && <span className={'LinkFlair ' + linkFlairColors.color}
                                       style={{backgroundColor: linkFlairColors.backgroundColor}}>{post.link_flair_text}</span>}
        <a target='_blank' rel='noreferrer' href={permaLink}>{post.title}</a>
        {post.over_18 && <span className='NsfwTag'>nsfw</span>}
      </div>

      {/*Url, Preview Image or Markup Text*/}
      {(linkUrl || previewUrl || contentText) &&
      <div className='PostCard__preview'>
        <a target='_blank' rel='noreferrer' href={urlLink}>
          {linkUrl && <><i>{urlLink}</i><ExternalLink/></>}
          {isVideo && <div className='PostCard__play'><PlayIcon/></div>}
          {previewUrl && <img src={previewUrl} alt='Described in title.'/>}
          {contentText && <div className="PostCard__content" dangerouslySetInnerHTML={{__html: contentText}}/>}
        </a>
      </div>}


      {/* TODO Thumbnail for Links*/}
      {/*{!!thumbUrl &&*/}
      {/*<div className='PostCard__thumbnail'>*/}
      {/*  <a target='_blank' rel='noreferrer' href={urlLink}>*/}
      {/*    <img src={thumbUrl} alt='Described in title.'/>*/}
      {/*  </a>*/}
      {/*</div>}*/}

      {/*UpVotes, Comments and Awards*/}
      <div className='PostCard__bottom'>
        <span><UpVotesIcon/> {numeral(post.ups).format('0.[0]a')}</span>
        <span><CommentsIcon/> {numeral(post.num_comments).format('0.[0]a')}</span>
        {!!awardsCount && <span className={'Awards--' + awardsColor}><GoldIcon/> {numeral(awardsCount).format('0.[0]a')}</span>}
      </div>
    </div>
  )
};

export default PostCard;
