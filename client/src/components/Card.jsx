import React from "react";
import { download } from "../assets";
import { downloadImage } from "../utils";
const Card = ({ _id, name, prompt, photo }) => {
  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <img
        src={photo}
        alt={prompt}
        className="w-full h-auto rounded-xl object-cover"
      />
      <div className="absolute hidden group-hover:flex flex-col bottom-0 left-0 right-0 m-2 p-4 rounded-md bg-gray-900">
        <p className="text-white text-md overflow-y-auto">{prompt}</p>
        <div className="mt-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex items-center justify-center text-white text-xs font-bold">
              {name[0].toUpperCase()}
            </div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button
            type="button"
            onClick={() => downloadImage(_id, photo)}
            className="outline-none bg-transparent border-none"
          >
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
