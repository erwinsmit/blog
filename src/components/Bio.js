import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src="https://pbs.twimg.com/profile_images/461249241952706560/aXScqorc_400x400.jpeg"
          alt={`Erwin Smit`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          Personal blog by{' '}
          <a href="https://mobile.twitter.com/rwinsmit">Erwin Smit</a>.{' '}<br />
          I'm still trying to draw the rest of the <a href="https://i.redd.it/auobn0jcerwy.jpg">f*cking owl...</a>
        </p>
      </div>
    );
  }
}

export default Bio;
