import React from 'react';
import { Button } from 'primereact/button';

const ReplayPanel = ({ onStartStop }) => (
  <>
    <div id={"replay"}>
      <Button icon="pi pi-replay" onClick={onStartStop} />
    </div>
  </>
)

export default ReplayPanel;
