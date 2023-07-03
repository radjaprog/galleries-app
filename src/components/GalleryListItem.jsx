import React, { useState } from "react";
import { ConfirmationDialog } from "./ConfirmationDialog";

export default function GalleryListItem({
  gallery,
  onViewDetails,
  onEditCallback,
  onDeleteCallback,
}) {
  const { id, name, content, images } = gallery;
  console.log(images[0]);

  const handleViewDetails = () => {
    onViewDetails(id);
  };

  const handleEdit = () => {
    onEditCallback(id);
  };

  const handleDelete = () => {
    onDeleteCallback(id);
  };

  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <li className="gallery-list-item">
        <img src={images[0]?.image_url} alt="Gallery thumbnail" />

        <div className="mt-auto mb-auto">
          <h4> {name} </h4>
          <p className="mb-2"> {content} </p>

          {onViewDetails && (
            <button onClick={handleViewDetails}>View details</button>
          )}
          {onEditCallback && (
            <button className="mb" onClick={handleEdit}>
              Edit
            </button>
          )}
          {onDeleteCallback && (
            <button className="mb" onClick={() => setShowDialog(true)}>
              Delete
            </button>
          )}
        </div>
      </li>

      {showDialog && (
        <ConfirmationDialog
          title="Delete gallery?"
          message="This action is irreversible"
          onSubmit={() => handleDelete(id)}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </>
  );
}
