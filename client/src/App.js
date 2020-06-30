import React, { Component } from 'react';
import './App.css';

import logo from './logo.svg';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyWebApi = new SpotifyWebApi();


class App extends Component{
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if(token){
      spotifyWebApi.setAccessToken(token);
    }
    this.state ={
      loggedIn: token ? true : false,
      nowPlaying: {
        name: 'Not Checked',
        albumArt: logo,
        artist: ''
      }
    } 
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
    .then((response) => {
      this.setState({
        nowPlaying: { 
            name: response.item.name, 
            albumArt: response.item.album.images[0].url,
            artist: response.item.artists[0].name
            }
        })
    })
  }
  
  render(){
      return (
  <div className="App">
      <div className="container">

          <a href='http://localhost:8888' className="waves-effect waves-light btn" > Login to Spotify </a>
      <div className="card-panel"> Now Playing: { this.state.nowPlaying.name } By: { this.state.nowPlaying.artist}</div>
            <div className="card-panel" ><img src={this.state.nowPlaying.albumArt} style={{ height: 250 }}/></div>
            
          { this.state.loggedIn &&
            <button className="waves-effect waves-light btn" onClick={() => this.getNowPlaying()}>
              Check Now Playing
            </button>
          }


      </div>
  </div>
    );
  }
}

export default App;
