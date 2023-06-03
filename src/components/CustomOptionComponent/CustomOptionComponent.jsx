
import './style.css';

const CustomOptionComponent = ({ label, value }) => {
    return (
        <div className="custom-option">
            <span className="custom-option-label">{label}</span>
            <span className="custom-option-value">{value}</span>
        </div>
    );
};

export default CustomOptionComponent;