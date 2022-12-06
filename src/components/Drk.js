import PropTypes from 'prop-types';

export default function Drk({ pro }) {
  const { alcoholicOrNot } = pro;
  return (
    <p>{`${alcoholicOrNot}`}</p>
  );
}

Drk.propTypes = {
  pro: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
  }).isRequired,
};
