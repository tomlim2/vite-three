uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

attribute vec3 position;
attribute float aRandom;

void main()
{
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);
	// modelPosition.z += sin(modelPosition.x * 20.0) * 0.1;
	modelPosition.z += aRandom * 0.1;

	vec4 viewPotision = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPotision;

	gl_Position = projectedPosition;
	//gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}