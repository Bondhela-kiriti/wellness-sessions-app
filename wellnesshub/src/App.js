
import './App.css';
import { Routes, Route , } from 'react-router-dom'
import MySessions from './components/MySessions';
import SessionEditor from './components/SessionEditor';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import SessionDetails from './components/SessionDetails';
import Navbar from './components/Navbar';





function App() {
  
  
  
  return (
    <div className="App">
      
      <Navbar/>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-sessions" element={<MySessions />} />
      <Route path="/my-sessions/:id" element={<SessionDetails />} />
      <Route path="/editor" element={<SessionEditor />} />
      <Route path="/editor/:id" element={<SessionEditor />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    
    
    </Routes>
      </div>
  );
}

export default App;
