import CryptocurrencyMeta from "./CryptocurrencyMeta";
import CommentContainer from "./CommentContainer";
import React from "react";
import agent from "../../agent";
import { connect } from "react-redux";
import marked from "marked";
import {
  CRYPTOCURRENCY_PAGE_LOADED,
  CRYPTOCURRENCY_PAGE_UNLOADED
} from "../../constants/actionTypes";

const mapStateToProps = state => ({
  ...state.cryptocurrency,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload => dispatch({ type: CRYPTOCURRENCY_PAGE_LOADED, payload }),
  onUnload: () => dispatch({ type: CRYPTOCURRENCY_PAGE_UNLOADED })
});

class Cryptocurrency extends React.Component {
  componentWillMount() {
    this.props.onLoad(
      Promise.all([
        agent.Cryptocurrency.get(this.props.match.params.id),
        agent.Comments.forCryptocurrency(this.props.match.params.id)
      ])
    );
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.cryptocurrency) {
      return null;
    }

    const markup = {
      __html: marked(this.props.cryptocurrency.body, { sanitize: true })
    };
    const canModify =
      this.props.currentUser &&
      this.props.currentUser.username ===
        this.props.cryptocurrency.author.username;
    return (
      <div className="cryptocurrency-page">
        <div className="banner">
          <div className="container">
            <h1>{this.props.cryptocurrency.title}</h1>
            <CryptocurrencyMeta
              cryptocurrency={this.props.cryptocurrency}
              canModify={canModify}
            />
          </div>
        </div>

        <div className="container page">
          <div className="row cryptocurrency-content">
            <div className="col-xs-12">
              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {this.props.cryptocurrency.tagList.map(tag => {
                  return (
                    <li className="tag-default tag-pill tag-outline" key={tag}>
                      {tag}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <hr />

          <div className="cryptocurrency-actions"></div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cryptocurrency);
