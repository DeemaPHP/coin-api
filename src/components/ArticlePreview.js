import React from "react";
import { Link } from "react-router-dom";
import agent from "../agent";
import { connect } from "react-redux";
import {
  CRYPTOCURRENCY_FAVORITED,
  CRYPTOCURRENCY_UNFAVORITED
} from "../constants/actionTypes";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

const mapDispatchToProps = dispatch => ({
  favorite: slug =>
    dispatch({
      type: CRYPTOCURRENCY_FAVORITED,
      payload: agent.Cryptocurrency.favorite(slug)
    }),
  unfavorite: slug =>
    dispatch({
      type: CRYPTOCURRENCY_UNFAVORITED,
      payload: agent.Cryptocurrency.unfavorite(slug)
    })
});

const ArticlePreview = props => {
  const cryptocurrency = props.cryptocurrency;
  const favoriteButtonClass = cryptocurrency.favorited
    ? FAVORITED_CLASS
    : NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (cryptocurrency.favorited) {
      props.unfavorite(cryptocurrency.slug);
    } else {
      props.favorite(cryptocurrency.slug);
    }
  };

  return (
    <div className="cryptocurrency-preview">
      <div className="cryptocurrency-meta">
        <Link to={`/@${cryptocurrency.author.username}`}>
          <img
            src={cryptocurrency.author.image}
            alt={cryptocurrency.author.username}
          />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${cryptocurrency.author.username}`}>
            {cryptocurrency.author.username}
          </Link>
          <span className="date">
            {new Date(cryptocurrency.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {cryptocurrency.favoritesCount}
          </button>
        </div>
      </div>

      <Link
        to={`/cryptocurrency/${cryptocurrency.slug}`}
        className="preview-link"
      >
        <h1>{cryptocurrency.title}</h1>
        <p>{cryptocurrency.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {cryptocurrency.tagList.map(tag => {
            return (
              <li className="tag-default tag-pill tag-outline" key={tag}>
                {tag}
              </li>
            );
          })}
        </ul>
      </Link>
    </div>
  );
};

export default connect(
  () => ({}),
  mapDispatchToProps
)(ArticlePreview);
