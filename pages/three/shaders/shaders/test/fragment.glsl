precision mediump float;

uniform vec3 uColor;

varying float vRandom;

void main()
{
	//gl_FragColor = vec4(0.0, vRandom, 1.0, 1.0);
	gl_FragColor = vec4(uColor, 1.0);
}