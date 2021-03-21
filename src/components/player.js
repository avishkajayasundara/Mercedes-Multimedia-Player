import React, { useState, useEffect } from "react";
import ReactAudioPlayer from "react-audio-player";
import { getToken, onMessageListener } from "../firebase";
import "./app.css";
import "./player.css";
import axios from "axios";
import PropTypes from "prop-types";

import Slideshow from "./slideshow";
import { Button } from "react-bootstrap";

import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

function Player(props) {
  const [show, setShow] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(0);
  const [notification, setNotification] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [isTokenFound, setTokenFound] = useState(false);
  const [songPlaying, setSongPlaying] = useState("");
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    getToken(setTokenFound);
  }, []);

  useEffect(() => {
    if (notification) {
      console.log("notification", notification);
      switch (notification.action) {
        case "PLAYLIST":
          axios.get(`/playlist/${notification.body}`).then((result) => {
            setCurrentlyPlaying(0);
            setPlaylist(result.data.playlist);
          });
          break;
        case "VOLUME":
          console.log(notification.body);
          console.log(parseFloat(notification.body));
          setVolume(parseFloat(notification.body));
          break;
      }
    }
  }, [notification]);

  useEffect(() => {
    if (playlist && playlist.songs.length > 0) {
      console.log(playlist.songs[0]);
      setSongPlaying(playlist.songs[0].url);
    }
  }, [playlist]);

  useEffect(() => {
    console.log(currentlyPlaying);
    if (playlist && currentlyPlaying > 0) {
      console.log(playlist, playlist.songs.length, currentlyPlaying);
      if (
        playlist.songs.length > 0 &&
        playlist.songs.length >= currentlyPlaying
      ) {
        if (playlist.songs[currentlyPlaying] != null)
          setSongPlaying(playlist.songs[currentlyPlaying].url);
      }
    }
  }, [currentlyPlaying]);

  onMessageListener()
    .then((payload) => {
      setShow(true);
      setNotification({
        action: payload.data.action,
        body: payload.data.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  const handleOnEnded = () => {
    console.log("on ended");
    setCurrentlyPlaying(currentlyPlaying + 1);
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  const handleVolumeChange = (event) => {
    setVolume(event.srcElement.volume);
  };

  return (
    <div className="App">
      <Slideshow />
      <ReactAudioPlayer
        src={songPlaying}
        controls
        autoPlay
        style={{ marginTop: 20 }}
        onEnded={handleOnEnded}
        volume={volume}
        onVolumeChanged={handleVolumeChange}
        className="player-app"
      />
      <Button
        variant="dark"
        className="logout"
        size="lg"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

Player.propTypes = {
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

const mapActionsToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Player);
