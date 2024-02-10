import Navbar from './Navbar';
import Home from 'Home.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        < Navbar />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
    
  );
}

export default App;
