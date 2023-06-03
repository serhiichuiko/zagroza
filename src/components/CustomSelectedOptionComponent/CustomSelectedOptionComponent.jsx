
import { ReactComponent as Arrow } from './img/arrow-bottom.svg';

import './style.css';

const CustomSelectedOptionComponent = ({ label, value, isOpen }) => {
    return (
        <div className={`selected-option ${isOpen ? 'active' : ''}`}>
            <div className='items'>
                <span className='label'>{label ? label : 'Select an option'}</span>
                <span className='value'>{value}</span>
            </div>
          <span className={`select-arrow ${isOpen ? 'active' : ''}`}>
            <Arrow />
          </span>
        </div>
      );
};

export default CustomSelectedOptionComponent;