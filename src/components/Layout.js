import React from 'react';
import { Link } from 'gatsby';
import Toggle from './Toggle';
import Helmet from 'react-helmet';

// import { rhythm, scale } from '../utils/typography';
import sun from '../assets/sun.png';
import moon from '../assets/moon.png';
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
          className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform"
        >
          <Link
            to={'/'}
            className="no-underline"
          >
            {title}
          </Link>
        </h1>
      );
    } else {
      return (
        <h3
          className='select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform'
        >
          <Link
            className='no-underline'
            to={'/'}
          >
            {title}
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
          className="bg-gradient-to-b text-black from-gray-50 to-white"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-8  py-4 relative z-10 max-w-8xl">
            <div className="flex items-center justify-between">

              {this.renderHeader()}
            </div>
            <div className="absolute h-1 bg-gradient-to-r from-transparent via-black dark:via-white to-transparent bottom-0 left-4 right-4 -z-1 opacity-5" />
          </div>
        </header>
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            {children}
          </div>
        </div>
      </div>
    
    );
  }
}

export default Layout;
