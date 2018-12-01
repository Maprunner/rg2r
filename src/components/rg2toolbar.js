import React, { Component } from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from 'primereact/button';

class RG2Toolbar extends Component {
    render() {
        return (
            <Toolbar>
                <div className="p-toolbar-group-left">
                    <h2>Routegadget 2</h2>
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
