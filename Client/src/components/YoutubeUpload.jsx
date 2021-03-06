import React from "react";
import PropTypes from "prop-types";

function YoutubeUpload({embedId }){

  return(
  <div className="container">
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>

  )
  }

YoutubeUpload.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default YoutubeUpload;