import React from 'react';
import { PublisherList } from "@civicactions/data-catalog-components";

const Publishers = ({ configContainer, orgs, title, children }) => {
  return (
    <div className={`dc-page ${configContainer}`}>
      <h1>{title}</h1>
      <div className="dc-page">
        {children}
        <PublisherList items = {orgs} />
      </div>
    </div>
  );
}

export default Publishers;