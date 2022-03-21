import React, { FC } from 'react';

export const ActionButtons: FC = () => {
  return (
    <div className="py-7 whitespace-nowrap text-sm font-medium text-gray-900">
      <div className="py-4  w-full">
        <a type="button" href="#" className="w-full border-2 border-gray-300 py-2 rounded-[10px] bg-white hover:bg-white text-xl text-center font-bold">
            Sign up
        </a>
      </div>
      <hr />
      <div className="py-4 w-full">
        <a type="button" href="#" className="w-full border-2 border-gray-300 text-black py-2 rounded-[10px] bg-gray-200 hover:bg-gray-200 text-xl text-center">
            I need help now!
        </a>
      </div>
      <div className="text-center">
        <a href="#" className="object-center text-gray-500">Click to locate and contact authorities now</a>
      </div>
    </div>
  );
};
