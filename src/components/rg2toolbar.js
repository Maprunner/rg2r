import React, { Component } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import logo from '../rg2-logo.png';

class RG2Toolbar extends Component {
  render() {
    return (
      <Toolbar>
        <div className="p-toolbar-group-left">
          <img id="rg2-resize-info-icon" width="30" height="30" alt="RG2 logo" src={logo}></img>
          <div className="rg2-title">Routegadget 2</div>
        </div>
        <div className="p-toolbar-group-right">
          <Button icon="pi pi-search" style={{ marginRight: '.25em' }} />
          <Button icon="pi pi-calendar" className="p-button-success" style={{ marginRight: '.25em' }} />
          <Button icon="pi pi-times" className="p-button-danger" />
        </div>
      </Toolbar>
    )
  }
}
export default RG2Toolbar;
