class AudioAnalyser {
  constructor() {
    this.emptyArray = [];
    this.getAudioAnalyser().then(analyser => {
      this.analyser = analyser;

      this.rawSpectrum = new Uint8Array(this.analyser.frequencyBinCount);
      this.spectrum = new Array(this.rawSpectrum.length);

      this.rawWave = new Uint8Array(this.analyser.frequencyBinCount);
      this.wave = new Array(this.rawWave.length);
    });
  }
  async getAudioAnalyser() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    return analyser;
  }
  getSpectrum() {
    let spectrum;
    if (this.analyser) {
      this.analyser.getByteFrequencyData(this.rawSpectrum);
      this.rawSpectrum.forEach((value, index) => this.spectrum[index] = value / 255);
      spectrum = this.spectrum;
    } else {
      spectrum = this.emptyArray;
    }
    return {
      spectrum,
    };
  }
  getWave() {
    let wave, rms;
    if (this.analyser) {
      this.analyser.getByteTimeDomainData(this.rawWave);
      const n = this.rawWave.length;
      let squareSum = 0;
      for (let i = 0; i < n; i++) {
        const sample = this.rawWave[i];
        const normalized = sample / 255;
        this.wave[i] = normalized;
        squareSum += (normalized - .5)**2;
      }
      wave = this.wave;
      rms = Math.sqrt(squareSum / n);
    } else {
      wave = this.emptyArray;
      rms = 0;
    }
    return {
      wave,
      rms,
    };
  }
}

export {AudioAnalyser};
