import React from "react";
import Library from "../map/Library";
import { useSelector } from "react-redux";
import Software from "../map/Software";
import Softone from "../map/Softone";
import Samguri from "../map/Samguri";
import Bio from "../map/Bio";
import Multi from "../map/Multi";
import Softtwo from "../map/Softtwo";
import Softthree from "../map/Softthree";
import Multiin from "../map/Multiin";

const Campus = () => {
  const location = useSelector((state) => state.location.location);
  switch (location) {
    case "software":
      return <Software />;
    case "library":
      return <Library />;
    case "softone":
      return <Softone />;
    case "softtwo":
      return <Softtwo />;
    case "softthree":
      return <Softthree />;
    case "samguri":
      return <Samguri />;
    case "multiin":
      return <Multiin />;
    case "bio":
      return <Bio />;
    case "multi":
      return <Multi />;
    case null:
      return;
    default:
      return <p>오류가 발생했습니다.</p>;
  }
};

export default Campus;
