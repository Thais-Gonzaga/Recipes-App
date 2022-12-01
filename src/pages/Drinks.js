import { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  const [searchBarOn, setSearchBarOn] = useState(false);

  const toggleSearchBar = () => {
    setSearchBarOn((prevState) => !prevState);
  };
  return (
    <div>
      <Header title="Drinks" isSearchOn toggleSearchBar={ toggleSearchBar } />
      {searchBarOn && <SearchBar />}
      <Footer />
    </div>
  );
}

export default Drinks;
