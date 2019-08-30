import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LogItem from './LogItem';
import PreLoader from '../layout/PreLoader';

const Logs = props => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  const getLogs = async () => {
    setLoading(true);

    const response = await axios.get('/logs');

    setLogs(response.data);
    setLoading(false);
  };

  const renderLogs = () => {
    if (!loading && logs.length === 0) {
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

export default Logs;
