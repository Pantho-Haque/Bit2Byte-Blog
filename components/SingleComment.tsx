'use client';
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from 'lucide-react';

const SingleComment = ({ username, date, content, upvotes, downvotes, replies }
  : { username: string; date: string; content: string; upvotes: number; downvotes: number; replies: any[] }
) => {
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = () => {
    setShowReplies(!showReplies);
  };

  return (
    <div className="border-l-2 border-slate-700 pl-3 my-5 hover:border-slate-300">
      <div className="flex flex-col items-left justify-between bg-slate-900 px-5 py-3 rounded-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-semibold">{username}</span>
            <span className="text-sm text-gray-500 ml-2">{date}</span>
          </div>
        </div>
        <p className="mt-2 mb-1">{content}</p>
        <div className="flex items-center justify-between space-x-2">
          <div className='flex gap-2'>
            <button className="text-green-500 flex justify-center items-center">
              <ChevronUp size={18} />
              {upvotes}
            </button>
            <button className="text-red-500 flex justify-center items-center">
              <ChevronDown size={18} />
              {downvotes}
            </button>
          </div>
          {replies && replies.length > 0 && (
            <button 
              onClick={toggleReplies}
              className="flex items-center text-gray-400 hover:text-gray-200 text-sm"
            >
              {showReplies ? (
                <>
                  <ChevronDown size={16} className="mr-1" />
                  Hide Replies
                </>
              ) : (
                <>
                  <ChevronRight size={16} className="mr-1" />
                  Show Replies ({replies.length})
                </>
              )}
            </button>
          )}
        </div>
      </div>
      
      {replies && replies.length > 0 && showReplies && (
        <div className="mt-2">
          {replies.map((reply, index) => (
            <SingleComment key={index} {...reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleComment;
