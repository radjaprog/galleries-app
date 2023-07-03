import React, { useState, useEffect } from "react";
import galleryService from "../services/GalleryService";
import GalleryList from "../components/GalleryList";

export default function AppMyGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [lastPage, setLastPage] = useState(1);

  const fetchMyGalleries = async () => {
    try {
      const { data, last_page } = await galleryService.getMyGalleries();
      setGalleries(data);
      setLastPage(last_page);
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    fetchMyGalleries();
  }, []);

  const onChangePage = (page) => {
    fetchMyGalleries(page);
  };

  return (
    <>
      <h2>My Galleries</h2>
      <GalleryList
        galleries={galleries}
        canView
        canEdit
        canDelete
        onChangePage={onChangePage}
        lastPage={lastPage}
      />
    </>
  );
}
