import React from 'react';

class Bio extends React.Component {
  render() {
    return (
      <div
        className='bg-gradient bg-gradient-to-br from-gray-50 to-gray-100 mt-8 p-8 rounded-md shadow-md'
        style={{
          maxWidth: "320px"
        }}
      >
        <img
          src={'https://pbs.twimg.com/profile_images/461249241952706560/aXScqorc_400x400.jpeg'}
          alt={`Erwin Smit`}
          className="rounded-full mb-4"
        />
        <div className='prose'>
          <p>
            Hi, I'm Erwin. <br />
            I'm a Web Developer
            focussing on the "Head" in Headless development. 
          </p>
          <p>I like to write about my experiences in developing against Headless solutions like Sitecore JSS.</p>
          <p>
            <a href="https://twitter.com/RwinSmit" target="_blank">Twitter</a> <span>/</span> <a href="https://github.com/erwinsmit" target="_blank">GitHub</a>
          </p>
        </div>
      </div>
    );
  }
}

export default Bio;
