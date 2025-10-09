import shader1Vert from './1/vertex.glsl'
import shader1Frag from './1/fragment.glsl'
import shader2Vert from './2/vertex.glsl'
import shader2Frag from './2/fragment.glsl'

class shaderPatternManager {
	constructor(){
		this.patterns = {
			shader1: {
				vertex: shader1Vert,
				fragment: shader1Frag
			},
			shader2: {
				vertex: shader2Vert,
				fragment: shader2Frag
			}
		};
	}
}

export default new shaderPatternManager();