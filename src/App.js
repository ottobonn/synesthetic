import React, {Component} from 'react';
import './App.css';

import {SceneManager} from './SceneManager';
import {AudioAnalyser} from './AudioAnalyser';

class App extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.state = {
      width: 1,
      height: 1,
    }
  }
  render() {
    return (
      <canvas id="main" ref={this.canvasRef}></canvas>
    );
  }
  updateDimensions() {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }
  componentDidMount(){
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    const analyser = new AudioAnalyser();

    const sceneManager = new SceneManager({
      canvas: this.canvasRef.current,
    });

    const animate = () => {
      this.animationFrameRequest = requestAnimationFrame(animate);
      const {spectrum} = analyser.getSpectrum();
      const {wave, rms} = analyser.getWave();
      sceneManager.animate({
        spectrum,
        wave,
        rms,
        width: this.state.width,
        height: this.state.height,
      });
    }
    animate();
  }
  componentWillUnmount() {
    if (this.animationFrameRequest) {
      cancelAnimationFrame(this.animationFrameRequest);
    }
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }
}

export default App;
