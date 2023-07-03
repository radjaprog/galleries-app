import React from "react";

function SingleImage({ image }) {
  const { id, image_url, gallery_id } = image;

  return (
    <div>
      <p>URL: {image_url} </p>
    </div>
  );
}

export default SingleImage;
