// Styles
import './ActionsBar.scss';

export default function ActionsBar(props) {

  const loadSubReddit = event => {
    event.preventDefault();

    let searchTerm = event.target.elements.search.value.trim().replace(/^r\//i, '');

    props.filter(
      {
        search: !!searchTerm ? searchTerm : 'popular'
      }
    );
  }

  return (
    <div className='ActionsBar'>
      <form onSubmit={loadSubReddit}>
        <input type='text' name='search' className='ActionsBar__search' placeholder='r/Popular'/>
      </form>
    </div>
  )
};
