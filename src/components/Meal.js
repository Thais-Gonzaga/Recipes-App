import PropTypes from 'prop-types';

export default function Meal({ nationality, category }) {
  return (
    <p>{`${nationality} - ${category}`}</p>
  );
}

Meal.propTypes = {
  nationality: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
