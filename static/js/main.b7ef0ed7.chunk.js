(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports=n(22)},16:function(e,t,n){},18:function(e,t,n){},22:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n.n(a),r=n(6),s=n.n(r),c=(n(16),n(1)),o=n(2),h=n(9),u=n(7),l=n(10),d=(n(18),n(0)),v=function(){function e(t){var n=t.scene;Object(c.a)(this,e);for(var a=[],i=0;i<100;i++){var r=new d.f,s=-Math.PI/2,o=2*Math.PI/100,h=s+o*i+.01,u=h+(o-.02);r.moveTo(0,0),r.absarc(0,0,1,h,u,!1),r.lineTo(0,0);var l=new d.a(r,{depth:1,steps:1,bevelEnabled:!1,curveSegments:24}),v=new d.c({color:61183}),m=new d.b(l,v);n.add(m),a.push(m)}this.slices=a}return Object(o.a)(e,[{key:"animate",value:function(e){var t=e.spectrum;if(t.length){var n=this.slices.length,a=Math.floor(t.length/n);this.slices.forEach(function(e,n){var i=Math.max(Math.log(10*t[n*a]),.01);e.scale.x=i,e.scale.y=i})}}}]),e}(),m=function(){function e(t){var n=t.canvas;Object(c.a)(this,e);var a=new d.e,i=new d.d(76,1,.1,1e3),r=n.getContext("webgl2"),s=new d.g({canvas:n,context:r});this.canvas=n,this.scene=a,this.camera=i,this.renderer=s,i.position.z=5,this.visualizers=[new v({scene:a})]}return Object(o.a)(e,[{key:"animate",value:function(e){var t=e.width,n=e.height,a=e.spectrum;t===this.lastWidth&&n===this.lastHeight||(this.renderer.setSize(t,n),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.lastWidth=t,this.lastHeight=n),this.visualizers.forEach(function(e){return e.animate({width:t,height:n,spectrum:a})}),this.renderer.render(this.scene,this.camera)}}]),e}(),f=n(4),w=n.n(f),p=n(8),g=function(){function e(){var t=this;Object(c.a)(this,e),this.getAudioAnalyser().then(function(e){return t.analyser=e})}return Object(o.a)(e,[{key:"getAudioAnalyser",value:function(){var e=Object(p.a)(w.a.mark(function e(){var t,n,a,i;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.mediaDevices.getUserMedia({audio:!0});case 2:return t=e.sent,n=new AudioContext,a=n.createMediaStreamSource(t),(i=n.createAnalyser()).fftSize=512,a.connect(i),e.abrupt("return",i);case 9:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getSpectrum",value:function(){var e=[];this.analyser&&(e=new Uint8Array(this.analyser.frequencyBinCount),this.analyser.getByteFrequencyData(e));var t=new Array(e.length);return e.forEach(function(e,n){return t[n]=e/255}),t}}]),e}(),y=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(h.a)(this,Object(u.a)(t).call(this,e))).canvasRef=i.a.createRef(),n.state={width:1,height:1},n}return Object(l.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){return i.a.createElement("canvas",{id:"main",ref:this.canvasRef})}},{key:"updateDimensions",value:function(){this.setState({width:window.innerWidth,height:window.innerHeight})}},{key:"componentDidMount",value:function(){var e=this;this.updateDimensions(),window.addEventListener("resize",this.updateDimensions.bind(this));var t=new g,n=new m({canvas:this.canvasRef.current});!function a(){e.animationFrameRequest=requestAnimationFrame(a),n.animate({spectrum:t.getSpectrum(),width:e.state.width,height:e.state.height})}()}},{key:"componentWillUnmount",value:function(){this.animationFrameRequest&&cancelAnimationFrame(this.animationFrameRequest),window.removeEventListener("resize",this.updateDimensions.bind(this))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[11,2,1]]]);
//# sourceMappingURL=main.b7ef0ed7.chunk.js.map