import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

import TechSelectOptions from '../techs/TechSelectOptions';

import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
  const [log, setLog] = useState({
    message: '',
    tech: ''
  });

  const [attention, setAttention] = useState(false);

  const { message, tech } = log;

  useEffect(() => {
    if (current) {
      setLog({
        message: current.message,
        tech: current.tech
      });

      setAttention(current.attention);
    }
    // eslint-disable-next-line
  }, [current]);

  const onChange = e => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please add message and tech' });
      return;
    }
    console.log(message, attention, tech);

    const updatedLogValues = {
      id: current.id,
      message,
      attention,
      tech,
      date: new Date()
    };

    updateLog(updatedLogValues);

    M.toast({ html: `Log updated by ${tech}` });

    // Clear input fields
    setLog({
      message: '',
      tech: ''
    });
    setAttention(false);
  };

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Enter system log</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='message'
              value={message}
              onChange={onChange}
            />
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <select
              name='tech'
              value={tech}
              className='browser-default'
              onChange={onChange}
            >
              <option value='' disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
            <label htmlFor='tech' className='active'>
              Log Message
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <p>
              <label>
                <input
                  type='checkbox'
                  className='filled-in'
                  name='attention'
                  value={attention}
                  checked={attention}
                  onChange={() => setAttention(!attention)}
                />
                <span>Needs attention</span>
              </label>
            </p>
          </div>
        </div>
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect waves-light blue btn'
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: '75%',
  height: '75%'
};

///////////////////////////// propTypes ////////////////////////////////

EditLogModal.propTypes = {
  current: PropTypes.object,
  updateLog: PropTypes.func
};

///////////////////////////// mapStateToProps ////////////////////////////////

const mapStateToProps = state => ({
  current: state.log.current
});

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  updateLog: log => dispatch(updateLog(log))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditLogModal);
