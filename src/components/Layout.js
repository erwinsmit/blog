import React from 'react';
import { Link } from 'gatsby';
import Toggle from './Toggle';
import Helmet from 'react-helmet';
const logo = require('../logo.svg');

import '../css/output.css';
class Layout extends React.Component {
  state = {
    theme: null,
  };
  componentDidMount() {
    // this.setState({ theme: window.__theme });
    // window.__onThemeChange = () => {
    //   this.setState({ theme: window.__theme });
    // };
  }
  renderHeader() {
    const { location, title } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;

    if (location.pathname === rootPath) {
      return (
        <h1
          className="select-none text-slate-800 text-2xl font-bold tracking-tight my-4 transition duration-150 ease-out transform"
        >
          <Link
            to={'/'}
            className="no-underline"
          >
            <img src={logo} alt="logo" className="inline-block mr-2 w-52 bg-white/80 px-3 py-2" />
            
          </Link>
        </h1>
      );
    } else {
      return (
        <h3
          className='select-none text-slate-800 text-2xl font-bold tracking-tight my-4 transition duration-150 ease-out transform'
        >
          <Link
            className='no-underline'
            to={'/'}
          >
            <img src={logo} alt="logo" className="inline-block mr-2 w-52 bg-white/80 px-3 py-2" />
          </Link>
        </h3>
      );
    }
  }
  render() {
    const { children } = this.props;

    return (
      <div
        className="min-h-screen flex flex-col false false font-sans"
      >
        <header
          className="bg-gradient-to-b text-black from-gray-50 to-white pattern"
          
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8  py-4 relative z-10 max-w-8xl">
            <div className="flex items-center justify-between">

              {this.renderHeader()}

              <a href="/rss.xml" className='font-bold text-blue-400 text-xl bg-white/80 p-2 px-3' target="_blank" rel="noopener noreferrer">
                rss
              </a>
            </div>
            <div className="absolute h-1 bg-gradient-to-r from-transparent via-black to-transparent bottom-0 left-4 right-4 -z-1 opacity-5" />
          </div>
        </header>
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto sm:px-8">
            {children}
          </div>
        </div>
      </div>
    
    );
  }
}

export default Layout;
