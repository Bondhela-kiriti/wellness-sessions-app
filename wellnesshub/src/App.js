
import './App.css';
import { Routes, Route , Navigate} from 'react-router-dom'
import MySessions from './components/MySessions';
import SessionEditor from './components/SessionEditor';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import SessionDetails from './components/SessionDetails';
import Navbar from './components/Navbar';




function App() {
  const token = localStorage.getItem("token");
  
  
  return (
    <div className="App">
      
      <Navbar/>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={ token ? <Dashboard /> : <Navigate to= "/login"/>}/>
      <Route path="/my-sessions" element={token ? <MySessions /> : <Navigate to= "/login"/>} />
      <Route path="/my-session/:id" element={<SessionDetails/>} />
      <Route path="/session-editor" element={token ? <SessionEditor/> : <Navigate to= "/login"/>} />
      <Route path='*' element={<Navigate to="/dashboard"/>}/>
    
    
    </Routes>
      </div>
  );
}

export default App;
