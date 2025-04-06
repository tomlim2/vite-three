uniform vec2 uFrequency;
uniform float uTime;

attribute float aRandom;

varying float vRandom;
varying vec2 vUv;
varying float vElevation;

void main()
{
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

	float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
	elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;

	modelPosition.z += elevation;

	modelPosition.z += sin(uTime + modelPosition.x * uFrequency.x) * 0.1;
	modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;
	// modelPosition.z += aRandom * 0.1;

	vec4 viewPotision = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPotision;

	gl_Position = projectedPosition;
	//gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

	vRandom = aRandom;
	vUv = uv;
	vElevation = elevation;
}