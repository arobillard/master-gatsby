import React from 'react';
import { ItemsGrid, ItemStyles } from '../styles/Grid';

export default function LoadingGrid({ count }) {
  return (
    <ItemsGrid>
      {Array.from({ length: count }, (_, i) => (
        <ItemStyles key={`loading-ph-${Math.ceil(Math.random() * 100000)}`}>
          <p>
            <span className="mark">Loading...</span>
          </p>
          <img
            className="loading"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAECAQAAADsOj3LAAAADklEQVR42mNkgANGQkwAAJoABWH6GPAAAAAASUVORK5CYII="
            alt="Loading"
            width="500"
          />
        </ItemStyles>
      ))}
    </ItemsGrid>
  );
}
