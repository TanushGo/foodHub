import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'


const Card = (props) =>  {
    function timeSince(date1) {
        var seconds = Math.floor((new Date() - date1) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
      }
  return (
    <Link to={'/post/'+ props.id}>
      <div className="Card">
          <h3 className="time">Posted {timeSince(new Date(props.time))} ago</h3>
          <h2 className="title">{props.title}</h2>
          <h3 className="upvotes">{props.upvotes} votes</h3>
      </div>
    </Link>
  );
};

export default Card;