import { func } from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';

function Recommendations({ fetchApi }) {
  const [response, setResponse] = useState([]);

  const fetchCB = useCallback(async () => {
    const data = await fetchApi();
    if (!data) return;
    setResponse(data);
  }, [fetchApi]);

  useEffect(() => {
    fetchCB();
  }, [fetchCB]);

  console.log(response);

  return (
    <div />

  );
}

Recommendations.propTypes = {
  fetchApi: func.isRequired,
};

export default Recommendations;
