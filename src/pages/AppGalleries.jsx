import React, { useState, useEffect } from "react";
import galleryService from "../services/GalleryService";
import GalleryList from "../components/GalleryList";

export default function AppGalleries() {
  const [galleries, setGalleries] = useState([]);
  const [lastPage, setLastPage] = useState(1);

  const fetchGalleries = async (page = 1) => {
    try {
      const { data, last_page } = await galleryService.getAll(page);
      setGalleries(data);
      setLastPage(last_page);
    } catch (error) {
      return error.response;
    }
  };

  useEffect(() => {
    fetchGalleries();
  }, []);

  const onChangePage = (page) => {
    fetchGalleries(page);
  };

  return (
    <>
      <h2>Galleries</h2>
      <GalleryList
        galleries={galleries}
        canView
        onChangePage={onChangePage}
        lastPage={lastPage}
      />
    </>
  );
}
