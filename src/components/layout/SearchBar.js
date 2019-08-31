import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { searchLogs } from '../../actions/logActions';

const SearchBar = ({ searchLogs }) => {
  const [text, setText] = useState('');

  const searchFromLogs = e => {
    e.preventDefault();
    searchLogs(text);
  };

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className='nav-wrapper'>
        <form onSubmit={e => searchFromLogs(e)}>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              value={text}
              name='text'
              placeholder='Search Logs...'
              onChange={e => setText(e.target.value)}
            />
            <label className='label-icon' htmlFor='search'>
              <i className='material-icons'>search</i>
            </label>
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

///////////////////////////// propTypes ////////////////////////////////

SearchBar.propTypes = {
  searchLogs: PropTypes.func.isRequired
};

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  searchLogs: text => dispatch(searchLogs(text))
});

export default connect(
  null,
  mapDispatchToProps
)(SearchBar);
