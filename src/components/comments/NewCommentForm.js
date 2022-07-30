import { Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';

import { useHttp } from '../../hooks/use-http';

import LoadingSpinner from '../UI/LoadingSpinner';
import { addComment } from '../../lib/api';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const { sendRequest, status } = useHttp(addComment, true);
 
  const commentTextRef = useRef();
  const { quoteID } = useParams();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const comment = commentTextRef.current.value;

    sendRequest({quoteID, comment}).then(res => {
      props.onComment(comment);
    })
    // send comment to server
  };

  return (
    <Fragment>
    {status === 'SEND' && <div className='centered'><LoadingSpinner /></div>}
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
    </Fragment>
  );
};

export default NewCommentForm;
