import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, Segment } from 'semantic-ui-react'

export class NavMenu extends Component {
  static displayName = NavMenu.name;
  state = { activeItem: 'Customers'           
}

handleItemClick = (e, { name }) => 
{    
this.setState({ activeItem: name })
}

  render() {
    const { activeItem } = this.state
    return (
      <Segment inverted>
        <Menu inverted primary='true'>
          <Menu.Item
            name='React'
          />
           <Menu.Item as = {Link} to ={'/'}
            name='Customers'
            active={activeItem === 'Customers'}              
            onClick={this.handleItemClick}
            
          />
          <MenuItem  
          name='Products'
          active={activeItem === 'Products'}
          onClick= {this.handleItemClick} 
          as = {Link} to ='/Products'          
         />
         <MenuItem  
          name='Stores'
          active={activeItem === 'Stores'}
          onClick= {this.handleItemClick} 
          as = {Link} to ='/Stores'          
         />
         <MenuItem  
          name='Sales'
          active={activeItem === 'Sales'}
          onClick= {this.handleItemClick} 
          as = {Link} to ='/Sales'          
         />
          </Menu>
          </Segment>
    );
  }
}
