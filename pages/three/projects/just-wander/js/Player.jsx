import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Player() {
	const meshRef = useRef()
	const keysPressed = useRef({
		w: false,
		a: false,
		s: false,
		d: false
	})

	const sphereRadius = 2
	const moveSpeed = 8 // units per second
	const rotationSpeed = 10 // radians per second

	// Character position and rotation
	const position = useRef(new THREE.Vector3(0, sphereRadius, 0)) // start at top
	const quaternion = useRef(new THREE.Quaternion())

	useEffect(() => {
		const handleKeyDown = (e) => {
			const key = e.key.toLowerCase()
			if (key === 'w') keysPressed.current.w = true
			if (key === 'a') keysPressed.current.a = true
			if (key === 's') keysPressed.current.s = true
			if (key === 'd') keysPressed.current.d = true
		}

		const handleKeyUp = (e) => {
			const key = e.key.toLowerCase()
			if (key === 'w') keysPressed.current.w = false
			if (key === 'a') keysPressed.current.a = false
			if (key === 's') keysPressed.current.s = false
			if (key === 'd') keysPressed.current.d = false
		}

		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	}, [])

	useFrame((state, delta) => {
		if (!meshRef.current) return

		// Get current up direction (from sphere center to character)
		const up = position.current.clone().normalize()

		// A/D: Rotate around up-axis
		if (keysPressed.current.a || keysPressed.current.d) {
			const rotationAmount = (keysPressed.current.d ? 1 : -1) * rotationSpeed * delta
			const rotationQuat = new THREE.Quaternion().setFromAxisAngle(up, rotationAmount)
			quaternion.current.premultiply(rotationQuat)
		}

		// W/S: Move forward/backward
		if (keysPressed.current.w || keysPressed.current.s) {
			const moveDirection = (keysPressed.current.w ? 1 : -1)

			// Get character's forward direction (local Z-axis transformed by quaternion)
			const localForward = new THREE.Vector3(0, 0, 1)
			const forward = localForward.clone().applyQuaternion(quaternion.current)

			// Project forward vector onto sphere surface (tangent plane)
			const tangentForward = forward.clone().sub(up.clone().multiplyScalar(forward.dot(up)))
			tangentForward.normalize()

			// Calculate rotation axis (perpendicular to both up and tangent forward)
			const rotationAxis = new THREE.Vector3().crossVectors(up, tangentForward).normalize()

			// Calculate rotation angle based on arc length
			const arcLength = moveSpeed * delta * moveDirection
			const rotationAngle = arcLength / sphereRadius

			// Rotate position around the axis
			const rotationQuat = new THREE.Quaternion().setFromAxisAngle(rotationAxis, rotationAngle)
			position.current.applyQuaternion(rotationQuat)

			// Maintain sphere radius
			position.current.normalize().multiplyScalar(sphereRadius)

			// Rotate the quaternion to match new position
			const oldUp = up
			const newUp = position.current.clone().normalize()
			const upRotation = new THREE.Quaternion().setFromUnitVectors(oldUp, newUp)
			quaternion.current.premultiply(upRotation)
		}

		// Update mesh
		meshRef.current.position.copy(position.current)
		meshRef.current.quaternion.copy(quaternion.current)
	})

	return <>
		<mesh ref={meshRef}>
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<coneGeometry args={[0.2, 0.5, 4]} />
				{/* <boxGeometry args={[0.3, 0.3, 0.3]} /> */}
				<meshStandardMaterial color="#3AA99F" />
			</mesh>
		</mesh>
	</>
}
