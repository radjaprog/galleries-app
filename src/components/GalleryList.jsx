import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import GalleryListItem from "./GalleryListItem";
import { useEffect, useState } from "react";
import galleryService from "../services/GalleryService";

export default function GalleryList({
  galleries,
  canView,
  canEdit,
  canDelete,
  onChangePage,
  lastPage,
}) {
  const [galleriesToDisplay, setGalleriesToDisplay] = useState(galleries);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const history = useHistory();

  useEffect(() => {
    setGalleriesToDisplay(galleries);
  }, [galleries]);

  useEffect(() => {
    setPageCount(lastPage);
  }, [lastPage]);

  const handleViewDetails = (id) => {
    history.push("/galleries/" + id);
  };

  const handleEdit = (id) => {
    history.push("/edit-gallery/" + id);
  };

  const handleDelete = async (id) => {
    const deleted = await galleryService.delete(id);

    if (deleted > 0) {
      const newMyGalleries = galleries.filter((gallery) => gallery.id !== id);
      setGalleriesToDisplay(newMyGalleries);
    } else {
      alert("An error has appeared. Please inspect if Gallary is deleted.");
    }
  };

  const handleNextPage = () => {
    const page = currentPage + 1;
    onChangePage(page);
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    const page = currentPage - 1;
    onChangePage(page);
    setCurrentPage(page);
  };

  return (
    <>
      <ul className="gallery-list">
        {galleriesToDisplay.map((gallery) => (
          <GalleryListItem
            key={gallery.id}
            gallery={gallery}
            onViewDetails={canView && handleViewDetails}
            onEditCallback={canEdit && handleEdit}
            onDeleteCallback={canDelete && handleDelete}
          />
        ))}
      </ul>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <button onClick={handleNextPage} disabled={currentPage === pageCount}>
        Next
      </button>
    </>
  );
}
