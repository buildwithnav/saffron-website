import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import PrivateEvents from './components/PrivateEvents';
import Reservations from './components/Reservations';
import Location from './components/Location';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <PrivateEvents />
      <Reservations />
      <Location />
      <Footer />
    </div>
  );
}

export default App;
