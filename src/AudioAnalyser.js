class AudioAnalyser {
  constructor() {
    this.getAudioAnalyser().then(analyser => this.analyser = analyser);
  }
  async getAudioAnalyser() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    source.connect(analyser);
    return analyser;
  }
  getSpectrum() {
    let rawSpectrum = [];
    if (this.analyser) {
      rawSpectrum = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteFrequencyData(rawSpectrum);
    }
    const spectrum = new Array(rawSpectrum.length);
    rawSpectrum.forEach((value, index) => spectrum[index] = value / 255);
    return {spectrum};
  }
  getWave() {
    let rawWave = [];
    if (this.analyser) {
      rawWave = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteTimeDomainData(rawWave);
    }
    const wave = new Array(rawWave.length);
    rawWave.forEach((value, index) => wave[index] = value / 255);

    const n = wave.length;
    const squareSum = wave.reduce((total, sample) => total + (sample - .5)**2, 0);
    const rms = n ? Math.sqrt(squareSum / n) : 0;

    return {wave, rms};
  }
}

export {AudioAnalyser};
