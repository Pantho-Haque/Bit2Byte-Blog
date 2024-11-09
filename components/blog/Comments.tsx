import React from 'react';
import SingleComment from './SingleComment';

const Comments = ({ comments } : 
    { comments: { username: string; date: string; content: string; upvotes: number; downvotes: number; replies: any[] }[] }
) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <SingleComment key={index} {...comment} />
      ))}
    </div>
  );
};

export default Comments;
