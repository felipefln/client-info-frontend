import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import ListarCliente from './components/ListarCliente'
import CriarCliente from './components/CriarCliente'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={ListarCliente}/>
                <Route path="/criar" exact component={CriarCliente}/>
            </Switch>
        </BrowserRouter>
    );
}