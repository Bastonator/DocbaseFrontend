"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FileType } from "@/components/FetchDocs";

interface FileProps {
  result: FileType[];
}

const Search: React.FC<FileProps> = ({ result }) => {
  const [Search, setSearch] = useState("");

  const handleChange = (val: FileType) => {
    setSearch(val);
    console.log("Value", val);
  };

  const handleSubmit = (val) => {
    console.log("Submitted", val);
    console.log("Submitted", val);
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/patients/search_files?search=${Search}`)

      .then((res) => {
        result(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [Search]);

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
              value={Search}
              onChange={(e) => handleChange(e.target.value.toLowerCase())}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  handleSubmit(e.target.value.toLowerCase());
              }}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;
