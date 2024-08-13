import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateCircle from './pages/CreateCircle';
import Circle from './pages/Circle';
import Navbar from './components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-circle" element={<CreateCircle />} />
                <Route path="/circle/:id" element={<Circle />} />
            </Routes>
        </Router>
    );
}

export default App;

