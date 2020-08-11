import React from 'react';
import PropTypes from 'prop-types';
import { ApiDocs } from "@civicactions/data-catalog-components";

const ApiDocsFull = ({ rootUrl, containerClass, innerClass }) => (
  <div className={`dc-page ${containerClass}`}>
    <div className={innerClass}>
      {typeof window !== `undefined` && (
        <ApiDocs endpoint={rootUrl} />
      )}
    </div>
  </div>
);

ApiDocsFull.defaultProps = {
  containerClass: '',
  innerClass: 'page-content',
}

ApiDocsFull.propTypes = {
  rootUrl: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
  innerClass: PropTypes.string,
}

export default ApiDocsFull;
