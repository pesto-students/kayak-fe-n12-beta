import EventsProvider from '../../providers/EventsProvider';
import AppBar from './AppBar';

const Header = () => {
  return (
    <EventsProvider>
      <AppBar />
    </EventsProvider>
  );
};

export default Header;
