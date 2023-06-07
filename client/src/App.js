import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <section>
      <NavBar />
      
      <Outlet />
      </section>
  )
}

export default App;
