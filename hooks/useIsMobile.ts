import React, { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const parser = new UAParser(window.navigator.userAgent);
    const { type } = parser.getDevice();

    setIsMobile(type === "mobile" || type === "tablet");
  }, []);
  return isMobile;
};

export default useIsMobile;
