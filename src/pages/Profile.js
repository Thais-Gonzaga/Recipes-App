import { useHistory } from 'react-router';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();

  function getEmail() {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
    return '';
  }
  function pushLogin() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" isSearchOn={ false } />
      <form>
        <p data-testid="profile-email">{ getEmail() }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ pushLogin }
        >
          Logout
        </button>
      </form>
    </div>
  );
}

export default Profile;
