/* Imports */
import './App.css';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoutes';
import Element from './element/Element';
import LoginPage from './login/LoginForm';
import CreateElementPage from './element/CreateElementPage';
import UpdateElementPage from './element/UpdateElementPage';



/* App */
function App() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/element" element={<ProtectedRoute><Element/></ProtectedRoute>}/>
            <Route path='/create-element' element={<ProtectedRoute><CreateElementPage/></ProtectedRoute>}/>
            <Route path='/update-element' element={<ProtectedRoute><UpdateElementPage/></ProtectedRoute>}/>
        </Routes>        
    );
}



/* Export */
export default App;
