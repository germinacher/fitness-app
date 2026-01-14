import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import MainMenu from './components/MainMenu';
import ProtectedRoute from './components/ProtectedRoute';
import ProfileEdit from './components/ProfileEdit';
import Chatbot from './components/Chatbot';
import RutinaViewer from './components/RutinaViewer';
import DietaViewer from './components/DietaViewer';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import TermsAndConditions from './components/TermsAndConditions';
import PrivacyPolicy from './components/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            <Login />
          } 
        />
        <Route 
          path="/register" 
          element={
            <Register />
          } 
        />
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
        <Route
          path="/dietaviewer" 
          element={
            <ProtectedRoute>
              <DietaViewer />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/forgot-password" 
          element={
            <ForgotPassword />
          } 
        />
        <Route 
          path="/reset-password/:token" 
          element={
            <ResetPassword />
          } 
        />
        <Route 
          path="/" 
          element={
            <Login />
          } 
        />
        <Route 
          path="/terms" 
          element={
            <TermsAndConditions />
          }
        />
        <Route 
          path="/privacy" 
          element={
            <PrivacyPolicy />
          }
        />
      </Routes>
    </Router>
  );
}
export default App;