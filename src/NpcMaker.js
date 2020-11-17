import React from 'react';
import './NpcMaker.css';

import Portrait from './components/Portrait/Portrait.js';
import ProgressBar from './components/ProgressBar/ProgressBar.js';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import ReloadIcon from '@material-ui/icons/Cached';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


class NpcMaker extends React.Component{

	state = null;

	charParams = [
		"candor", "vivacity", "coordination", 
		"meekness", "humility", "cruelty",
		"self-preservation",  "patience",
		"decisiveness", "imagination", 
		"curiosity", "aggression", "loyalty", 
		"empathy", "tenacity", "courage", 
		"sensuality", "charm", "humor",
	];
	charParamsMin = 0;
	charParamsMax = 20;

	constructor(props){
		super(props);
		this.state = {
			status: "ready",
	
			characters: [
				{
					selected: true,
					name: "mario rossi",
					adjective: "dangerous",
					job: "pirate",
					sex: 'female',
					avatar: "portraits/female/seed0177[1].png",
					params: this.charParams.map(p=>{return this._paramRandomVal(p) }),
					curiosity: [
						"A very wealthy person",
						"Hides a secret related to the main plot",
						"Hides the fact of being a relative of someone the characters fought in the past"
					]
				}
			]
		};
		console.log(this.state)
	}

	_paramRandomVal( param ){
		return {
			name: param,
			value: Math.round( 
							this.charParamsMin + Math.random()*( this.charParamsMax - this.charParamsMin ) 
						)
		};
	}

	render(){
		let content;
		switch(this.state.status){
			case 'loading':
				content = <CircularProgress onClick={this.startGeneratingCharacter.bind(this,[1])} />;
				break;
			default:
			case 'ready':
				if( this.state.characters.length ){
					let char = this.state.characters.find(c=>c.selected);
					if( char ){
						content = this.characterSheet(char);
					}else{
						content = <Typography>
									Generate a character!
								</Typography>;
					}
				}else{

				}
				break;
		}

		let html = <Box className="npcmaker">
						<Container className="npcmaker_area">
							{content}
						</Container>
						<Fab color="primary" aria-label="generate">
							<ReloadIcon />
						</Fab>
					</Box>;
		return html;
	}

	componentDidMount(){
		this.startGeneratingCharacter(1);
	}

	startGeneratingCharacter(){
		/*this.setState({
			status: 'loading'
		});*/

	}

	characterSheet( char ){
		let portraitSize = Math.min( 512, document.body.clientWidth * 0.7 );
		let textCss = {
			textShadow: "0 1px 1px rgba(0,0,0,0.1),0 2px 2px rgba(0,0,0,0.1)"
		}
		let progressCol = "#00798C"
		let html = <Box className="npcmaker_sheet">
						<Typography align="center" variant="h2" style={textCss}>
							{char.name}
						</Typography>
						<Typography align="center" variant="h5" style={textCss}>
							{char.adjective} {char.job} {char.sex==='male' ? "♂" : "♀"}
						</Typography>
						<Portrait img={char.avatar} size={portraitSize} />
						<details open>
							<summary>
								<Typography style={{display:'inline'}}>Curiosity</Typography>
							</summary>
							<div>
								<ul>
									{ char.curiosity.map(c =>
											<li>
												<Typography style={textCss}>
													{c}
												</Typography>
											</li>
										)
									}
								</ul>
							</div>
						</details>
						<details open>
							<summary>
								<Typography style={{display:'inline'}}>Personality</Typography>
							</summary>
							<div>
								{ char.params
										.sort((a,b)=>b.value-a.value)
										.map( p =>
											<ProgressBar min={this.charParamsMin} max={this.charParamsMax} value={p.value} text={p.name} mainColor={progressCol} />
										) 
								}
							</div>
						</details>
						{ this.state.characters.filter(c=>!c.selected).length ? 
							<details>
								<summary>
									<Typography style={{display:'inline'}}>All generated npc</Typography>
								</summary>
								<div>
									<ul>
										{
											this.state.characters.filter(c=>!c.selected).map(c => 
													<li>
														{c.name}
													</li>
											)
										}
									</ul>
								</div>
							</details> : null }
					</Box>;
		return html;
	}
}


export default NpcMaker;
