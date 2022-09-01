import { useState, useEffect } from "react";
import PropertyCard from "./PropertyCard";
import Header from "./Header";
import { AppContext } from "./context/AppContext";

function App() {
  const [properties, setProperties] = useState();
  const [searchField, setSearchField] = useState("");
  const [isFav, setIsFav] = useState(false);
  // use this state to keep track of the user's saved/bookmarked properties
  const [savedProperties, setSavedProperties] = useState([]);

  useEffect(() => {
    if (savedProperties.length === 0) {
      setIsFav(false);
    }
    const fetchPropertyData = async () => {
      const response = await fetch("/property-data.json");
      const json = await response.json();
      setProperties(json.result.properties.elements);
      if (isFav && savedProperties) {
        setProperties(savedProperties);
      }
      if (searchField) {
        const filteredProps = properties.filter((prop) => {
          return prop.short_description
            .toLowerCase()
            .includes(searchField.toLowerCase());
        });
        setProperties(filteredProps);
      }
    };
    fetchPropertyData();
  }, [searchField, isFav, savedProperties]);

  return (
    <AppContext.Provider value={{ searchField, setSearchField, setIsFav }}>
      <div className="container mx-auto my-5">
        <Header savedProperties={savedProperties} />
        {!!properties && properties.length === 0 ? (
          <div className="devide-y divide-slate-300  h-52 flex justify-center	items-center ">
            <h2 className="text-slate-500 text-xl	">
              Sorry, no properties found for your search criteria. Please try
              again with alternative values.
            </h2>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 gap-4 mt-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            path="/"
          >
            {!!properties &&
              properties.map((property) => (
                <PropertyCard
                  key={property.property_id}
                  property={property}
                  setSavedProperties={setSavedProperties}
                  savedProperties={savedProperties}
                />
              ))}
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

export default App;
