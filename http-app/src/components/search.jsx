import React, { useState } from "react";

const Search = () => {
  const [input, setInput] = useState("");
  let foods = [
    {
      id: 1,
      title: "Gilos",
    },
    {
      id: 2,
      title: "Olma",
    },
    {
      id: 3,
      title: "Behi",
    },
    {
      id: 4,
      title: "Nok",
    },
    {
      id: 5,
      title: "Xurmo",
    },
  ];

  const hanldeChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  if (input.length > 0) {
    foods = foods.filter((i) => {
      return i.title.toLowerCase().match(input);
    });
  }

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Search"
        onChange={hanldeChange}
        value={input}
      />

      {foods.map(({ title, id }, index) => (
        <ul>
          <li key={index}>{title}</li>
        </ul>
      ))}
    </div>
  );
};

export default Search;
