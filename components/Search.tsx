"use client";
import React from "react";
type SearchProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      <div className={"search border-black rounded-b-full"}>
        <div className={"search-input-wrapper bg-white "}>
          <img
            src={"/assets/icons/search.svg"}
            alt={"search"}
            width={24}
            height={24}
          />
          <form className="w-full bg-white">
            <input
              className={"search-input"}
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
