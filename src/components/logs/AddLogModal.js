import React, { useState } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

// import actions below
import { addLog } from '../../actions/logActions';

const AddLogModal = ({ addLog }) => {
  const [log, setLog] = useState({
    message: '',
    tech: ''
  });

  const [attention, setAttention] = useState(false);

  const { message, tech } = log;

  const onChange = e => {
    setLog({ ...log, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    if (message === '' || tech === '') {
      M.toast({ html: 'Please add message and tech' });
      return;
    } else {
      const newLog = {
        message,
        attention,
        tech,
        date: new Date()
      };
      addLog(newLog);

      M.toast({ html: `New log added by ${tech}` });

      // Clear input fields
      setLog({
        message: '',
        tech: ''
      });
      setAttention(false);
    }
  };

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
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
            <label htmlFor='message' className='active'>
              Log Message
            </label>
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
              <option value='John Doe'>John Doe</option>
              <option value='Sam Smith'>Sam Smith</option>
              <option value='Sara Wilson'>Sara Wilson</option>
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
AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired
};

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  addLog: log => dispatch(addLog(log))
});

export default connect(
  null,
  mapDispatchToProps
)(AddLogModal);
