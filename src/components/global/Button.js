import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = ({ onClick, innerLink, loading, ...props }) => {
	if (innerLink) {
		return (
			<Link to={innerLink} {...props}>
				{loading ?? <div className='loader' />}
				{props.children}
			</Link>
		);
	}
	return (
		<button onClick={onClick} {...props}>
			{loading ?? <div className='loader' />}
			{props.children}
		</button>
	);
};

Button.defaultProps = {
	loading: false,
};

Button.propTypes = {
	loading: PropTypes.bool,
	onClick: PropTypes.func.isRequired,
};

export default Button;
