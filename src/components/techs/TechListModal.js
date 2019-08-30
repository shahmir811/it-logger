import React, { useState, useEffect } from 'react';
import axios from 'axios';

import TechItem from './TechItem';

const TechListModal = props => {
  const [techs, setTechs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTechs();
    // eslint-disable-next-line
  }, []);

  const getTechs = async () => {
    setLoading(true);

    const response = await axios.get('/techs');

    setTechs(response.data);
    setLoading(false);
  };

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

export default TechListModal;
