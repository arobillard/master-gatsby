import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const PaginationStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--grey);
  border-radius: 5px;
  margin: 2rem 0;
  & > * {
    padding: 1rem;
    text-decoration: none;
    &.current,
    &[aria-current='page'] {
      color: var(--red);
    }
    &[disabled] {
      pointer-events: none;
      color: var(--grey);
    }
  }
`;

export default function Pagination({
  pageSize,
  totalCount,
  currentPage,
  skip,
  base,
}) {
  // makes some variables
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const hasPrevPage = prevPage >= 1;
  const hasNextPage = nextPage <= totalPages;
  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`/${base}/${prevPage}`}>
        &#8592; Previous
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link
          key={`pagination-${i}`}
          className={currentPage === 1 && i === 0 ? 'current' : ''}
          to={`/${base}/${i > 0 ? i + 1 : ''}`}
        >
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`/${base}/${nextPage}`}>
        Next &#8594;
      </Link>
    </PaginationStyles>
  );
}
