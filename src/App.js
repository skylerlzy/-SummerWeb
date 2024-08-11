import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateCircle from './pages/CreateCircle';
import Circle from './pages/Circle';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/create-circle" component={CreateCircle} />
                <Route path="/circle/:id" component={Circle} />
            </Switch>
        </Router>
    );
}

export default App;
