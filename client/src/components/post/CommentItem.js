import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeComment } from '../../actions/post';
import Moment from 'react-moment';

const CommentItem = ({
  postId,
  comment: { _id, text, avatar, name, user, date },
  removeComment,
  auth,
}) => (
  <div className='post bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Commented on <Moment format='DD/MM/YYYY HH:MM'>{date}</Moment>
      </p>
      {!auth.loading && auth.user._id === user && (
        <button
          type='button'
          className='btn btn-danger'
          onClick={e => removeComment(postId, _id)}
        >
          <i className='fas fa-times'></i>
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  removeComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { removeComment }
)(CommentItem);
