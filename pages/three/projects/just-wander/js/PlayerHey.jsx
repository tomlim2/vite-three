import { useFrame } from "@react-three/fiber"
import { useRef, useEffect } from "react"
import * as THREE from 'three'

export default function PlayerHey() {
	const meshRef = useRef()
	const keysPressed = useRef({
		d: false,
	})
	const position = useRef(new THREE.Vector3(0,1,0))
	const quaternion = useRef(new THREE.Quaternion())
	useEffect(()=>{
		
		const handleKeyDown = (e) => {
			const key = e.key.toLowerCase()
			if (key === 'd') keysPressed.current.d = true
		}
		const handleKeyUp = (e) => {
			const key = e.key.toLowerCase()
			if (key === 'd') keysPressed.current.d = false
		}
		window.addEventListener('keydown', handleKeyDown)
		window.addEventListener('keyup', handleKeyUp)
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			window.removeEventListener('keyup', handleKeyUp)
		}
	},[])
	useFrame((state, delta) => {
		if (!meshRef.current) return
		const up = position.current.clone().normalize()
		if (keysPressed.current.d) {
			const rotationAmount = delta
			const rotationQuat = new THREE.Quaternion().setFromAxisAngle(up, rotationAmount)
			quaternion.current.premultiply(rotationQuat)
		}
		meshRef.current.position.copy(position.current)
		meshRef.current.quaternion.copy(quaternion.current)
	})
	return <>
		<mesh ref={meshRef}>
			<coneGeometry args={[0.2, 0.5, 4]} />
			{/* <boxGeometry args={[0.3, 0.3, 0.3]} /> */}
			<meshStandardMaterial color="mediumpurple" />
		</mesh>
	</>
}
