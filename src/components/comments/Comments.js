import { useState, useEffect } from 'react'; 

import { useHttp } from '../../hooks/use-http';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';
import { getAllComments } from '../../lib/api';

const Comments = (props) => { 
  const { sendRequest, status, data:comments, error } = useHttp(getAllComments);
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { quoteID } = props;

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const commentHandler = (comment) => { 
    sendRequest(quoteID)
  }

  useEffect(() => { 
    // console.log('status is ', status)
    sendRequest(quoteID);
  }, [sendRequest, quoteID]);
  
  let content = <div className='centered'><LoadingSpinner /></div>;
  if(error){ 
    content = <p className='centered'>{error}</p>
  }
  else if(status === 'COMPLETE' && (!comments || comments.length === 0)){
    content = <p className='centered'>No comments were added yet!</p>
  }
  else if(status === 'COMPLETE' && comments && comments.length > 0){
    content = <CommentsList comments={comments} />
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onComment={commentHandler}/>}
      { content }
    </section>
  );
};

export default Comments;
