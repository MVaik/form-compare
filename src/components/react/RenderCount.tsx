import { useRef } from "react";

export const RenderCount = () => {
  const ref = useRef(0);

  return <div className="text-sm text-orange-500 w-max">x{++ref.current}</div>;
};
