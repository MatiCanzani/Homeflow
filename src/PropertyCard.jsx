import { FaBookmark } from "react-icons/fa";
import NoImage from "./assets/Image-Coming-Soon.png";

function PropertyCard({ property, savedProperties, setSavedProperties }) {
  const propertyImg = property.photos[0];
  const image = `https://mr0.homeflow.co.uk/${propertyImg}`;

  const bookmarked = savedProperties.some(
    (fav) => fav.property_id === property.property_id
  );

  const handleFavClick = (e, property) => {
    e.stopPropagation();
    setSavedProperties((prevState) =>
      !bookmarked
        ? [...prevState, property]
        : prevState.filter((fav) => fav.property_id !== property.property_id)
    );
  };

  return (
    <div className="border-2 bg-gray-50">
      <div className="relative">
        <img
          src={!propertyImg ? NoImage : image}
          alt={!propertyImg ? "no image " : property.display_address}
        />
        <button
          className="absolute top-0 right-2"
          title="Click to bookmark this property"
          onClick={(e) => handleFavClick(e, property)}
        >
          <FaBookmark
            className={bookmarked ? "text-red-400" : "text-yellow-400"}
            size="40"
          />
        </button>
        <p className="absolute bottom-0 right-0 px-2 py-1 border-t border-l bg-gray-50">
          {property.price}
        </p>
      </div>
      <div className="px-3 py-2">
        <p>{property.display_address}</p>
      </div>
    </div>
  );
}

export default PropertyCard;
