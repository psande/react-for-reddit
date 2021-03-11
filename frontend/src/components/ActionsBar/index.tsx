// Styles
import './ActionsBar.scss'

// Types
type Props = {
  filterBySub: (searchTerm : string) => void
}

const ActionsBar = (props: Props) => {
  const loadSubReddit = (event: any): void => {
    event.preventDefault()

    // Removes empty spaces
    const trimmedSearchTerm = event.target.elements.searchTerm.value.trim()

    // Removes r/ if prepended
    const cleanSearchTerm = trimmedSearchTerm.replace(/^r\//i, '')

    // Updates input with trimmed term as long as it is not just r/ (empty)
    event.target.elements.searchTerm.value = cleanSearchTerm ? trimmedSearchTerm : ''

    // Executes handler
    props.filterBySub(cleanSearchTerm)
  }

  return (
    <div className='ActionsBar'>
      <form onSubmit={loadSubReddit}>
        <input
          type='text'
          name='searchTerm'
          placeholder='r/Popular'
          className='ActionsBar__search'
        />
      </form>
    </div>
  )
}

export default ActionsBar
