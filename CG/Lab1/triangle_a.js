"use strict";

var gl;
var points;

window.onload = function init(){
	var canvas = document.getElementById( "triangle-canvas" );
	gl = WebGLUtils.setupWebGL( canvas );
	if( !gl ){
		alert( "WebGL isn't available" );
	}

	// Three Vertices
	var vertices = [
		-1.0, -1.0, 
		 0.0,  1.0, 
		 1.0, -1.0, 
		/*0.0, -1.0,
		 1.0, -1.0,
		 1.0,  1.0,
		 0.0, -1.0,
		 1.0,  1.0,
		 0.0,  1.0*/
		 /*-0.5, -0.5,
		 0.0, 0.5,
		 0.5, -0.5*/
	];

	// Configure WebGL
	gl.viewport( 0, 0, canvas.width, canvas.height );
	gl.clearColor( 1.0, 1.0, 1.0, 1.0 );//背景颜色

	// Load shaders and initialize attribute buffers
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );//载入顶点着色器和面片着色器
	gl.useProgram( program );

	// Load the data into the GPU
	var bufferId = gl.createBuffer();//CPU到GPU传入数据的中间缓存
	gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );//找到当前在使用的buffer，即bufferid指定的
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array( vertices ), gl.STATIC_DRAW );//向缓存区里写数据；gl.STATIC_DRAW表示用于绘制

	// Associate external shader variables with data buffer
	var vPosition = gl.getAttribLocation( program, "vPosition" );
	gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );//顶点属性指针；2表示两个点表示一个坐标
	gl.enableVertexAttribArray( vPosition );

	render();
}

function render(){//绘制函数
	gl.clear( gl.COLOR_BUFFER_BIT );//把之前所绘制的内容都清除掉
	gl.drawArrays( gl.TRIANGLES, 0, 3 );
}
