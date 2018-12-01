import React, { Component } from 'react';
import { Image } from 'react-konva';

class MapImage extends Component { 
    render() {
      return <Image image={this.props.map} />;
    }
  }
  
export default MapImage;
