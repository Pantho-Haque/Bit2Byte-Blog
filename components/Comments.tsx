import React from 'react';
import SingleComment from '@/components/SingleComment';

const Comments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment, index) => (
        <SingleComment key={index} {...comment} />
      ))}
    </div>
  );
};

export default Comments;
