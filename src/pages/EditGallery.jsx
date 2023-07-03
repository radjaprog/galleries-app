import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import galleryService from "../services/GalleryService";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { ErrorMessage } from "../components/ErrorMessage";

const getDefaultGalleryValues = () => ({
  name: "",
  content: "",
  images: [],
});

function CreateGallery() {
  const history = useHistory();
  const { id } = useParams();

  const [gallery, setGallery] = useState(getDefaultGalleryValues());
  const [errors, setErrors] = useState({});

  const getGallery = async (id) => {
    const data = await galleryService.get(id);
    setGallery(data);
  };

  useEffect(() => {
    if (id) {
      // pozovi api, rutu za dobavljanje jedne galerije (/galleries/{id})),
      // i dobijene vrednosti stavi kao defaultne vrednosti galerije
      getGallery(id);
    }
  }, []);

  const isSubmitDisabled = gallery.images.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await galleryService.edit(gallery);
    console.log(response);

    if (response.status === 422) {
      setErrors(response.data.errors);
      return;
    }
    history.push("/galleries/" + id);
  };

  const handleReset = () => {
    setGallery(getDefaultGalleryValues());
  };

  const handleImageUrlChange = (index, imageUrl) => {
    setGallery((prevGallery) => {
      const updatedImages = [...prevGallery.images];
      updatedImages[index].image_url = imageUrl;
      return {
        ...prevGallery,
        images: updatedImages,
      };
    });
  };

  const handleAddImage = () => {
    setGallery((prevGallery) => {
      return {
        ...prevGallery,
        images: [...prevGallery.images, { image_url: "" }],
      };
    });
  };

  const handleRemoveImage = (index) => {
    setGallery((prevGallery) => {
      const updatedImages = [...prevGallery.images];
      updatedImages.splice(index, 1);
      return {
        ...prevGallery,
        images: updatedImages,
      };
    });
  };

  const renderErrors = (fieldKey) => {
    if (!errors[fieldKey]) {
      return;
    }

    return errors[fieldKey].map((error) => {
      return <ErrorMessage message={error} />;
    });
  };

  return (
    <div>
      <h2> Create Gallery </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          marginLeft: 15,
        }}
      >
        <input
          required
          type="name"
          value={gallery.name}
          placeholder="Name of new Gallery"
          onChange={({ target }) =>
            setGallery({ ...gallery, name: target.value })
          }
        />
        {renderErrors("name")}
        <input
          type="content"
          value={gallery.content}
          placeholder="Please write content"
          onChange={({ target }) =>
            setGallery({ ...gallery, content: target.value })
          }
        />
        {renderErrors("content")}
        <p>Required to add at least one image:</p>
        {gallery.images.map((image, index) => (
          <div key={index}>
            <input
              type="text"
              value={image.image_url}
              placeholder="Image URL"
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
            />

            {index > 0 && (
              <button type="button" onClick={() => handleRemoveImage(index)}>
                Remove Image
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={handleAddImage}>
          Add Another URL
        </button>
        <button type="submit" disabled={isSubmitDisabled}>
          Submit
        </button>
        <button type="button" onClick={handleReset}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateGallery;
