import React, { useContext } from "react";
import SearchBox from "./SearchBox";
import { BsFillBookmarksFill } from "react-icons/bs";
import { AppContext } from "./context/AppContext";

function Header({ savedProperties }) {
  const { setIsFav } = useContext(AppContext);

  return (
    <header className="flex flex-col md:flex-row justify-between  border-b-2 border-solid">
      <h1 className="text-8xl flex-1">Posh Properties</h1>
      <button
      disabled={savedProperties.length === 0}
        className="inline-flex items-center mr-5 disabled:text-slate-400 hover:font-bold"
        title="Click to see your bookmarked properties"
        onClick={() => setIsFav((prevState) => !prevState)}
      >
        <p>Bookmarked</p>
        <div className="relative ">
          <BsFillBookmarksFill className="text-yellow-400 ml-2 " size="30" />
          <div className="inline-flex absolute -top-1 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2">
            {savedProperties.length}
          </div>
        </div>
      </button>
      <SearchBox />
    </header>
  );
}

export default Header;
