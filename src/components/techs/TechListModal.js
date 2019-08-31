import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TechItem from './TechItem';
import { geTechnicians } from '../../actions/techActions';

const TechListModal = ({ geTechnicians, techs, loading }) => {
  useEffect(() => {
    geTechnicians();
    // eslint-disable-next-line
  }, []);

  const renderTechs = () => {
    if (!loading && techs.length === 0) {
      return <p className='center'>No technician available</p>;
    } else {
      return techs.map(tech => <TechItem key={tech.id} tech={tech} />);
    }
  };

  return (
    <div id='tech-list-modal' className='modal'>
      <div className='modal-content'>
        <h4>Technician List</h4>
        <ul className='collection'>{renderTechs()}</ul>
      </div>
    </div>
  );
};

///////////////////////////// propTypes ////////////////////////////////
TechListModal.propTypes = {
  techs: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  geTechnicians: PropTypes.func.isRequired
};

///////////////////////////// mapStateToProps ////////////////////////////////
const mapStateToProps = state => ({
  techs: state.tech.techs,
  loading: state.tech.loading
});

///////////////////////////// mapDispatchToProps ////////////////////////////////
const mapDispatchToProps = dispatch => ({
  geTechnicians: () => dispatch(geTechnicians())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TechListModal);
