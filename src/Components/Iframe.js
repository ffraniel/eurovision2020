import React from "react";

const Iframe = ({ src }) => (
  <div className="p-6 flex">
    <iframe
      title="Eurovision Artist Video"
      width="620"
      height="315"
      src={src}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

export default Iframe;
