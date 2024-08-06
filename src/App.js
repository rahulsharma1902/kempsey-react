import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes';


function App() {
  return (
    <Router>
                <Routes>
                  <Route path="/admin-dashboard/*" element={<AdminRoutes />} />                
                </Routes>
            </Router>
  );
}
export default App;
