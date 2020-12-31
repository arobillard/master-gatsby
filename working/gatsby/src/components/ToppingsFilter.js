import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const ToppingStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    text-decoration: none;
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 1rem;
    align-items: center;
    padding: 5px;
    background-color: var(--grey);
    border-radius: 2px;
    transition: background-color 0.2s, color 0.2s;
    &:hover,
    &:focus {
      background-color: var(--red);
    }
    .count {
      background-color: #fff;
      padding: 2px 5px;
    }
    &.active,
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countPizzasInToppings(pizzas) {
  // return pizzas with count
  const counts = pizzas
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce((acc, topping) => {
      // check if this is an existing topping
      const existingTopping = acc[topping.id];
      if (existingTopping) {
        // if yes, increment,
        existingTopping.count += 1;
      } else {
        // if not create new entry in acc and set to one
        acc[topping.id] = {
          id: topping.id,
          name: topping.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  // sort based on count
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
}

export default function ToppingsFilter({ activeTopping }) {
  // get a list of the toppings
  // get a list of pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery(graphql`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
          vegetarian
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // count how many pizzas have the topping
  const toppingsWithCount = countPizzasInToppings(pizzas.nodes);
  // display the topping and count of pizzas
  // link it up

  return (
    <ToppingStyles>
      <Link to="/pizzas">
        <span className="name">All</span>
        <span className="count">{pizzas.nodes.length}</span>
      </Link>
      {toppingsWithCount.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : null}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingStyles>
  );
}
