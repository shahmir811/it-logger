import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LogItem from './LogItem';
import PreLoader from '../layout/PreLoader';

// import actions below
import { getLogs } from '../../actions/logActions';

const Logs = ({ loading, logs, getLogs }) => {
  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  const renderLogs = () => {
    if (!loading && logs === null) {
      return <p className='center'>No logs to show</p>;
    } else {
      return logs.map(log => <LogItem key={log.id} log={log} />);
    }
  };

  if (loading) {
    return <PreLoader />;
  }

  return (
    <ul className='collection with-header'>
      <li className='collection-header'>
        <h4 className='center'>System Logs</h4>
      </li>
      {renderLogs()}
    </ul>
  );
};

///////////////////////////// propTypes ////////////////////////////////

Logs.propTypes = {
  logs: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  getLogs: PropTypes.func.isRequired
};

///////////////////////////// mapStateToProps ////////////////////////////////

const mapStateToProps = state => ({
  logs: state.log.logs,
  loading: state.log.loading
});

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  getLogs: () => dispatch(getLogs())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logs);
