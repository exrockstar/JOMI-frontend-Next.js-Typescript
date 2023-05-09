import styled from 'styled-components';

export const CustomStyles = `
  body {
    word-wrap: break-word !important;
    overflow-wrap: break-word;
    color: #333 !important;
    line-height: 1.42857143;
    font-size: 14px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }

  table td, table th {
    border-color: inherit !important;
  }

  img {
    max-width: 100%;
    height: auto;
    transition: filter 300ms, box-shadow 300ms;
  }

  p {
    margin: 0 0 10px;
  }

  .h4,
  .h5,
  .h6,
  h4,
  h5,
  h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .h1,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: unset;
    line-height: 1.1;
    color: inherit;
  }

  figure {
    display: table !important;
    margin: 1rem auto !important;
  }

  figure figcaption {
    color: #999 !important;
    display: block !important;
    margin-top: 0.25rem !important;
    text-align: center !important;
  }
`;

export const CustomPage = styled.div`
  ${CustomStyles}
`;
