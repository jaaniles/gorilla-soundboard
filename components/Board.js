import React, { Component } from 'react';
import Sound from 'react-sound';
import InputRange from 'react-input-range';

import {jaaniSounds, freeSounds, roopeSounds} from "../soundLists.js"

import '../css/all.css';
import "react-input-range/lib/css/index.css"

const PLAY    = Sound.status.PLAYING
const PAUSE   = Sound.status.PAUSED
const STOP    = Sound.status.STOPPED


class App extends Component {
  render() {
    return (
        <div className="board">
            <div className="board-header">
                <h2 className="title">[2017] <small>ONE MORE YEAR</small></h2>
            </div>
            <div>
                <h2 className="container-title">Free resources</h2>
                <div className="sounds-container">
                    {
                        freeSounds.map(sound => {
                            return <SoundBox sfx={sound.sfx} title={sound.title} key={sound.sfx}/>
                        })
                    }
                </div>
                
                <hr/>
                <h2 className="container-title">
                    Jaani 
                    <a href="https://www.linkedin.com/in/jaanileskinen/" target="_blank">
                        <small className="soc-logo"><i className="fa fa-linkedin"></i></small>
                    </a>
                </h2>
                <div className="sounds-container">
                    {
                        jaaniSounds.map(sound => {
                            return <SoundBox sfx={sound.sfx} title={sound.title} key={sound.sfx}/>
                        })
                    }
                </div>

                <hr/>
                <h2 className="container-title">
                    Roope
                    <a href="https://www.facebook.com/roope.timonen" target="_blank">
                        <small className="soc-logo"><i className="fa fa-facebook"></i></small>
                    </a>
                </h2>
                <div className="sounds-container">
                    {
                        roopeSounds.map(sound => {
                            return <SoundBox sfx={sound.sfx} title={sound.title} key={sound.sfx}/>
                        })
                    }
                </div>
            </div>
        </div>
    )
  }
}

class SoundBox extends Component {
    constructor(props){
        super(props)

        this.handleVolume   = this.handleVolume.bind(this)
        this.handleClick    = this.handleClick.bind(this)
        this.handleFinished = this.handleFinished.bind(this)
        this.handleRepeat   = this.handleRepeat.bind(this)
        this.handlePlaying  = this.handlePlaying.bind(this)

        this.state = {
            status: PAUSE,
            color: "pause",
            icon: "play",
            repeat: false,
            volume: 100,
            position: 0,
            duration: 1
        }
    }
    handlePlaying(sound){
        const {position, duration} = sound
        this.setState({position: position, duration: duration})
    }
    handleRepeat(){
        const repeat = !this.state.repeat
        this.setState({repeat: repeat})
    }
    handleVolume(vol){
        this.setState({volume: vol})
    }
    handleFinished(){
        this.setState({status: STOP, color: "pause", icon: "play", position: 0, duration: 1})

        if (this.state.repeat){this.setState({status: PLAY, color: "play", icon: "pause"})}
    }
    handleClick(){
        this.state.status === PLAY 
        ?
        this.setState({status: PAUSE, color: "pause", icon: "play"})
        :
        this.setState({status: PLAY, color: "play", icon: "pause"})
    }
    render() {
        const repeatIcon = this.state.repeat ? "unlink" : "repeat"
        return (
            <div className={`sound-block sound-${this.state.color}`}> 
                <div className="position-controls">
                    <InputRange
                        maxValue={this.state.duration}
                        minValue={0}
                        value={this.state.position}
                        onChange={position => this.handlePosChange(position)}/>
                    </div>

               <Sound
                url={`${process.env.PUBLIC_URL}/sfx/${this.props.sfx}`}
                onFinishedPlaying={this.handleFinished}
                volume={this.state.volume}
                onPlaying={this.handlePlaying}
                playStatus={this.state.status}/>


                <div className="sound-controls">
                    <div className="control pull-left" onClick={this.handleClick}> 
                        <i className={`fa fa-${this.state.icon}`} />
                    </div>

                    <small className="sound-title">{this.props.title || "No title"}</small>

                    <div className="control pull-right" onClick={this.handleRepeat}> 
                        <i className={`fa fa-${repeatIcon}`} ref="repeatIcon"/>
                    </div>
                </div>
                <div className="volume-controls" style={{transition: "none !important"}}>
                    <InputRange
                    maxValue={100}
                    minValue={0}
                    value={this.state.volume}
                    onChange={volume => this.handleVolume(volume)}/>
                </div>
            </div>
        )
    }
}

export default App;
