import React, { useState } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';

import { addTech } from '../../actions/techActions';

const AddTechModal = ({ addTech }) => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: ''
  });

  const { firstName, lastName } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please add first and last name' });
      return;
    } else {
      const newTechnician = {
        firstName,
        lastName
      };

      addTech(newTechnician);
      M.toast({ html: `New technician ${firstName} ${lastName} added` });
      setUser({
        firstName: '',
        lastName: ''
      });
    }
  };

  return (
    <div id='add-tech-modal' className='modal'>
      <div className='modal-content'>
        <h4>New Technician</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='firstName'
              value={firstName}
              onChange={onChange}
            />
            <label htmlFor='firstName' className='active'>
              First Name
            </label>
          </div>
        </div>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='lastName'
              value={lastName}
              onChange={onChange}
            />
            <label htmlFor='lastName' className='active'>
              Last Name
            </label>
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

///////////////////////////// propTypes ////////////////////////////////
AddTechModal.propTypes = {
  addTech: PropTypes.func.isRequired
};

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  addTech: tech => dispatch(addTech(tech))
});

export default connect(
  null,
  mapDispatchToProps
)(AddTechModal);
