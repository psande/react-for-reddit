// Styles
import './Loading.scss';

const Loading = () => (
  <div className='Loading' role='alert' aria-busy='true'>
    <span className='Loading__dot'/>
    <span className='Loading__dot'/>
    <span className='Loading__dot'/>
  </div>
);

export default Loading;
