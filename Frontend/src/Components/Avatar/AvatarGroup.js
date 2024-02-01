import React, { useState } from "react";
import avatar1 from '../../Assets/Images/hawara.jpg';
import avatar2 from '../../Assets/Images/hawara.jpg';
import avatar3 from '../../Assets/Images/hawara.jpg';

function AvatarGroup({ top3 }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="v-avatar-group relative">
      {top3.map((user, index) => (
        <div
          key={index}
          className={` inline-block relative ${index === 0 ? '' : '-ml-3'}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={index === 0 ? avatar1 : index === 1 ? avatar2 : avatar3}
            alt={`Avatar ${index + 1}`}
            className="w-9 h-9 -mb-2 rounded-full cursor-pointer border-2 border-black transition-transform transform hover:scale-110"
            data-tip={user.name}
          />

          {/* Tooltip */}
          {hoveredIndex === index && (
            <div
              id={`tooltip-${index}`}
              role="tooltip"
              className={`absolute z-20 tooltip inline-block w-24 -ml-8 text-sm text-second_font_color_dark transition-opacity duration-300 bg-third_bg_color_dark border border-main_border_color_dark rounded-md shadow-sm
                mt-4`}
            >
              <div className="py-1 relative">
                <div className="absolute w-2 h-2 bg-third_bg_color_dark border-t border-l border-solid border-main_border_color_dark transform -translate-x-1/2 rotate-45 left-2/4 -top-1"></div>
                <h3 className="font-semibold text-main_font_color_dark text-center">
                  {user.name}
                </h3>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AvatarGroup;
