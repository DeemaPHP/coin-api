import CryptocurrencyActions from "./CryptocurrencyActions";
import { Link } from "react-router-dom";
import React from "react";

const CryptocurrencyMeta = props => {
  const cryptocurrency = props.cryptocurrency;
  return (
    <div className="cryptocurrency-meta">
      <Link to={`/@${cryptocurrency.author.username}`}>
        <img
          src={cryptocurrency.author.image}
          alt={cryptocurrency.author.username}
        />
      </Link>

      <div className="info">
        <Link to={`/@${cryptocurrency.author.username}`} className="author">
          {cryptocurrency.author.username}
        </Link>
        <span className="date">
          {new Date(cryptocurrency.createdAt).toDateString()}
        </span>
      </div>

      <CryptocurrencyActions
        canModify={props.canModify}
        cryptocurrency={cryptocurrency}
      />
    </div>
  );
};

export default CryptocurrencyMeta;
