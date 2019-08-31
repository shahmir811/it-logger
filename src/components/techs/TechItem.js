import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteTech } from '../../actions/techActions';

const TechItem = ({ tech, deleteTech }) => {
  const { id, firstName, lastName } = tech;

  return (
    <li className='collection-item'>
      {firstName} {lastName}
      <a href='#!' className='secondary-content' onClick={() => deleteTech(id)}>
        <i className='material-icons grey-text'>delete</i>
      </a>
    </li>
  );
};

///////////////////////////// propTypes ////////////////////////////////

TechItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired
};

///////////////////////////// mapDispatchToProps ////////////////////////////////

const mapDispatchToProps = dispatch => ({
  deleteTech: id => dispatch(deleteTech(id))
});

export default connect(
  null,
  mapDispatchToProps
)(TechItem);
