import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function Slicemaster({ data }) {
  const { person } = data;
  return (
    <>
      <SEO title={person.name} image={person.image?.asset?.fluid?.src} />
      <div className="center">
        <Img fluid={person.image.asset.fluid} alt={person.name} />
        <h2>
          <span className="mark">{person.name}</span>
        </h2>
        <p>{person.description}</p>
      </div>
    </>
  );
}

export const query = graphql`
  query($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      name
      id
      description
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
