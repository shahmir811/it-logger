import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

// import actions below
import { deleteLog, setCurrent } from '../../actions/logActions';

const LogItem = ({ log, deleteLog, setCurrent }) => {
  const { message, attention, tech, id, date } = log;

  return (
    <li className='collection-item'>
      <div>
        <a
          href='#edit-log-modal'
          className={`modal-trigger ${attention ? 'red-text' : 'blue-text'}`}
          onClick={() => setCurrent(log)}
        >
          {message}
        </a>
        <br />
        <span className='grey-tech'>
          <span className='black-tech'>ID # {id}</span> last updated by{' '}
          <span className='black-tech'>{tech}</span> on{' '}
          <Moment format='MMMM Do YYYY, h:mm:ss a'>{date}</Moment>
        </span>
        <a
          href='#!'
          className='secondary-content'
          onClick={() => deleteLog(id)}
        >
          <i className='material-icons grey-text'>delete</i>
        </a>
      </div>
    </li>
  );
};

///////////////////////////// propTypes ////////////////////////////////

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired
};

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  deleteLog: id => dispatch(deleteLog(id)),
  setCurrent: log => dispatch(setCurrent(log))
});

export default connect(
  null,
  mapDispatchToProps
)(LogItem);
