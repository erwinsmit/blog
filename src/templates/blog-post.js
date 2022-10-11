import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import '../fonts/fonts-post.css';
import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import Signup from '../components/Signup';
import Panel from '../components/Panel';
import { formatPostDate, formatReadingTime } from '../utils/helpers';
import {
  codeToLanguage,
  createLanguageLink,
  loadFontsForCode,
} from '../utils/i18n';

const GITHUB_USERNAME = 'erwinsmit';
const GITHUB_REPO_NAME = 'blog';
const systemFont = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif`;

class Translations extends React.Component {
  render() {
    let { translations, lang, languageLink, editUrl } = this.props;


    return (
      <div className="translations">
        <Panel style={{ fontFamily: systemFont }}>
          {translations.length > 0 && (
            <></>
          )}
          {lang !== 'en' && (
            <>
              <br />
              <br />
              {lang !== 'ru' && (
                <>
                  <Link to={languageLink('en')}>Read the original</Link>
                  {' • '}
                  <a href={editUrl} target="_blank" rel="noopener noreferrer">
                    Improve this translation
                  </a>
                  {' • '}
                </>
              )}
              <Link to={`/${lang}`}>View all translated posts</Link>{' '}
            </>
          )}
        </Panel>
      </div>
    );
  }
}

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    let {
      previous,
      next,
      slug,
      translations,
      translatedLinks,
    } = this.props.pageContext;
    const lang = post.fields.langKey;

    // Replace original links with translated when available.
    let html = post.html;
    translatedLinks.forEach(link => {
      // jeez
      function escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      }
      let translatedLink = '/' + lang + link;
      html = html.replace(
        new RegExp('"' + escapeRegExp(link) + '"', 'g'),
        '"' + translatedLink + '"'
      );
    });

    translations = translations.slice();
    translations.sort((a, b) => {
      return codeToLanguage(a) < codeToLanguage(b) ? -1 : 1;
    });

    loadFontsForCode(lang);
    // TODO: this curried function is annoying
    const languageLink = createLanguageLink(slug, lang);
    const enSlug = languageLink('en');
    const editUrl = `https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO_NAME}/edit/master/src/pages/${enSlug.slice(
      1,
      enSlug.length - 1
    )}/index${lang === 'en' ? '' : '.' + lang}.md`;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          lang={lang}
          title={post.frontmatter.title}
          description={post.frontmatter.spoiler}
          slug={post.fields.slug}
        />
        <main className="max-w-7xl mx-auto px-6 sm:px-8 py-24 flex-1 pb-2">
          <article>
            <header>
              <h1 className="w-full relative	mb-8 text-6xl font-extrabold tracking-normal text-center title-font">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">
                  {post.frontmatter.title}
                </span>
              </h1>
              <div className="flex items-center justify-center mb-16">
                <p className="text-base font-medium text-gray-600 group-hover:text-gray-800">
                  {formatPostDate(post.frontmatter.date, lang)}
                </p>
                <span className="font-bold text-gray-200 mx-2">—</span>
                <p className='text-base text-gray-400 group-hover:text-gray-500'>
                  {`${formatReadingTime(post.timeToRead)}`}
                </p>
              </div>
              
            </header>
            <div className='prose lg:prose-xl max-w-none' dangerouslySetInnerHTML={{ __html: html }} />
            <footer>
              
            </footer>
          </article>
        </main>
        <aside>
          
        <div
          className='bg-gray-100 mt-8 p-8 rounded-md shadow-md flex flex-row items-start'
        >
          <img
            src={'https://pbs.twimg.com/profile_images/461249241952706560/aXScqorc_400x400.jpeg'}
            alt={`Erwin Smit`}
            className="rounded-full mr-4 w-24"
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
    
        </aside>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        spoiler
      }
      fields {
        slug
        langKey
      }
    }
  }
`;
