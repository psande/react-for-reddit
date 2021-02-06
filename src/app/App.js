/**
 * Here we declare app-wide settings and initializations.
 * It allows us to have different apps for different webpack entry point.
 *
 * Other things that could be declared are states (redux), contexts, routers or configs.
 */

// Layout
import MainLayout from '../layouts/Main';

// Pages
import HomePage from '../pages/Home';

// Styles
import './App.scss';

const App = () => {
  return (
    <MainLayout>
      <HomePage/>
    </MainLayout>
  );
};

export default App;
