import PropTypes from 'prop-types';

export default function Meal({ pro }) {
  // console.log(pro.pro);
  const { nationality, category } = pro;
  return (
    <p>{`${nationality} - ${category}`}</p>
  );
}

Meal.propTypes = {
  pro: PropTypes.shape({
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};
