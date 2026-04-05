import { SpinnerCircularFixed } from 'spinners-react';
import './Loader.css';

/**
 * Reusable loader used across the project.
 */
const Loader = ({
    size = 90,
    thickness = 95,
    speed = 180,
    color = '#9E4B3C',
    secondaryColor = '#d6a8a1',
    className = '',
    fullPage = false
}) => (
    <div className={`loader-wrapper ${fullPage ? 'loader-wrapper--fullpage' : ''} ${className}`.trim()}>
        <SpinnerCircularFixed size={size} thickness={thickness} speed={speed} color={color} secondaryColor={secondaryColor} />
    </div>
);

export default Loader;
