import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Player from './Player.jsx'

export default function Experience() {
	return <>

		<OrbitControls makeDefault />

		<Lights />

		<mesh castShadow scale={1}>
			<sphereGeometry />
			<meshStandardMaterial color="orange" />
		</mesh>

		<Player />

	</>
}