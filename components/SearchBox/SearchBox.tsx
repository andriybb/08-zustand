"use client";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  
  onChange: (value: string) => void;
  value: string;
}

function SearchBox({ onChange, value }: SearchBoxProps) {



  return (
    <>
      <input
        className={css.input}
        type="text"
        placeholder="Search notes"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        aria-label="Search notes"
      />
    </>
  );
}

export default SearchBox;