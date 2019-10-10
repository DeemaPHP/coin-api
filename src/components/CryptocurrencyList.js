import CryptocurrencyPreview from "./CryptocurrencyPreview";
import ListPagination from "./ListPagination";
import React from "react";

const CryptocurrencyList = props => {
  if (!props.cryptocurrency) {
    return <div className="cryptocurrency-preview">Loading...</div>;
  }

  if (props.cryptocurrency.length === 0) {
    return (
      <div className="cryptocurrency-preview">
        No cryptocurrency are here... yet.
      </div>
    );
  }

  return (
    <div>
      {props.cryptocurrency.map(cryptocurrency => {
        return (
          <CryptocurrencyPreview
            cryptocurrency={cryptocurrency}
            key={cryptocurrency.slug}
          />
        );
      })}

      <ListPagination
        pager={props.pager}
        cryptocurrencyCount={props.cryptocurrencyCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default CryptocurrencyList;
