export default function Player() {
	return <>
		<mesh>
			<icosahedronGeometry args={[0.3, 1]} />
			<meshStandardMaterial color="mediumpurple" />
		</mesh>
	</>
}