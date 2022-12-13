import UseFetchIng from '../../hooks/useFetchIng';
import UseFetchLett from '../../hooks/useFetchLett';
import UseFetchName from '../../hooks/useFetchName';

const searchAPIs = async (pathname, type, search) => {
  switch (type) {
  case 'ingredient': {
    if (pathname === '/meals') {
      const ingData = await UseFetchIng(search, 'meals');
      return ingData;
    }
    const ingData = await UseFetchIng(search, 'drinks');
    return ingData;
  }
  case 'name': {
    if (pathname === '/meals') {
      const nameData = await UseFetchName(search, 'meals');
      return nameData;
    }
    const nameData = await UseFetchName(search, 'drinks');
    return nameData;
  }
  default: {
    if (search.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return [];
    }
    if (pathname === '/meals') {
      const letterData = await UseFetchLett(search, 'meals');
      return letterData;
    }
    const letterData = await UseFetchLett(search, 'drinks');
    return letterData;
  }
  }
};

export default searchAPIs;
