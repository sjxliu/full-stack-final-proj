import React from "react";
import * as Loader from "react-loader-spinner";

const Spinner = ({message}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Loader.BallTriangle
        type="Circles"
        color="#0b3369"
        height={500}
        width={200}
        className="m-5"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;
