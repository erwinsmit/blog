import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Bio from '../components/Bio';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import Panel from '../components/Panel';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const langKey = this.props.pageContext.langKey;

    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <div className="grid md:grid-cols-12 gap-5">
          <main className='md:col-span-9'>
            {posts.map(({ node }) => {
              const title = get(node, 'frontmatter.title') || node.fields.slug;
              return (
                <article key={node.fields.slug} className="group block px-8 py-10 mt-8 last:mb-0 bg-gray-50 bg-gradient-to-br from-gray-50 to-gray-100 rounded-md shadow-sm transition-all duration-150 ease-out hover:shadow-md hover:to-gray-50">
                  <header>
                    <h3
                      className="text-blue-400 text-3xl font-semibold title-font mb-5 transition-all duration-150 ease-out group"
                      
                    >
                      <Link
                        style={{ boxShadow: 'none' }}
                        to={node.fields.slug}
                        rel="bookmark"
                      >
                        {title}

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 inline-block ml-2 transition-all group-hover:translate-x-2">
                          <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3a.75.75 0 010-1.5h16.19l-2.47-2.47a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>

                      </Link>
                    </h3>
                    <small>
                    <div className="flex items-center mb-4">
                      <p className="text-base font-medium text-gray-600 group-hover:text-gray-800">
                        {formatPostDate(node.frontmatter.date, langKey)}
                      </p>
                      <span className="font-bold text-gray-200 mx-2">—</span>
                      <p className='text-base text-gray-400 group-hover:text-gray-500'>
                        {`${formatReadingTime(node.timeToRead)}`}
                      </p>
                    </div>


                      {/* {formatPostDate(node.frontmatter.date, langKey)}
                      {` • ${formatReadingTime(node.timeToRead)}`} */}
                    </small>
                  </header>
                  <p
                    dangerouslySetInnerHTML={{ __html: node.frontmatter.spoiler }}
                  />
                </article>
              );
            })}
          </main>
          <aside className='md:col-span-3'>
            <Bio />
          </aside>
        </div>
        <Footer />
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
          }
        }
      }
    }
  }
`;
