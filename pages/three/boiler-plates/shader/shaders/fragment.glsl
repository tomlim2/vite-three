varying vec2 vUv;

void main()
{
    gl_FragColor = vec4(vUv, 1.0, 1.0);
	#include <tonemapping_fragment>
    #include <colorspace_fragment>
}