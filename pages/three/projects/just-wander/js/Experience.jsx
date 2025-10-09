import { OrbitControls } from '@react-three/drei'
import Lights from './Lights.jsx'
import Player from './Player.jsx'
import PlayerHey from './PlayerHey.jsx'

export default function Experience() {
	return <>

		<OrbitControls makeDefault />

		<Lights />

		<mesh castShadow scale={2}>
			<sphereGeometry />
			<meshStandardMaterial color="#FAEEC6" />
		</mesh>

		{/* <PlayerHey /> */}
		<Player />

	</>
}