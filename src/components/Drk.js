import PropTypes from 'prop-types';

export default function Drk({ alcoholicOrNot }) {
  return (
    <p>{`${alcoholicOrNot}`}</p>
  );
}

Drk.propTypes = {
  alcoholicOrNot: PropTypes.string.isRequired,
};
