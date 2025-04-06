uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
attribute float aRandom;

varying float vRandom;

void main()
{
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	modelPosition.z += sin(uTime + modelPosition.x * uFrequency.x) * 0.1;
	modelPosition.z += sin(modelPosition.y * uFrequency.y) * 0.1;
	// modelPosition.z += aRandom * 0.1;

	vec4 viewPotision = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPotision;

	gl_Position = projectedPosition;
	//gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

	vRandom = aRandom;
}