import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileEdit from './components/ProfileEdit';
import Chatbot from './components/Chatbot';
import RutinaViewer from './components/RutinaViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/main-menu" 
          element={
            <ProtectedRoute>
              <MainMenu />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/chatbot" 
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/rutinaviewer" 
          element={
            <ProtectedRoute>
              <RutinaViewer />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
export default App;