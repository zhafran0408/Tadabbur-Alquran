import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Bookmark from './pages/Bookmark';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/surat/:nomor" element={<Detail />} />
        <Route path="/bookmark" element={<Bookmark />} />
      </Routes>
    </Router>
  );
}

export default App;