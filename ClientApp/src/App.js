import React, { Component } from 'react';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter, Routes,Route,Switch} from "react-router-dom";
import DataCntxt from './DataCntxt';
import Footer from './components/Footer'

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>       
        <DataCntxt>        
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
        
        <Footer  /> 
        </DataCntxt>    
      </Layout>     
    );
  }
}
