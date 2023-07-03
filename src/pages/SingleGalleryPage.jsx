import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import galleryService from "../services/GalleryService";

export default function SingleGalleryPage() {
  const [gallery, setGallery] = useState({});
  const { id } = useParams();

  const handleGetSingleGallery = async (id) => {
    const gallery = await galleryService.get(id);

    setGallery(gallery);
  };

  useEffect(() => {
    handleGetSingleGallery(id);
  }, []);

  if (!gallery) {
    return <></>;
  }

  return (
    <>
      <h2>{gallery.name}</h2>
      <h4>
        by {gallery.user?.first_name} {gallery.user?.last_name}
      </h4>
      <p>{gallery.content}</p>

      <ul className="d-flex flex-row flex-wrap">
        {gallery.images?.map((image) => (
          <div className="image-container">
            <img src={image.image_url} alt="Gallery image" />
          </div>
        ))}
      </ul>

      <h3>Comments</h3>
      <ul>
        {gallery.comments?.map((comment) => (
          <li key={comment.id} className="mb-3">
            <h6 className="mb-1">
              {comment.user.first_name} {comment.user.last_name} at
              {new Date(comment.created_at).toLocaleString()}
            </h6>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
