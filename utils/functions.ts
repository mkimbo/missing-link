//const geofire = require("geofire-common");
import Cookies from "js-cookie";
export const loadScript = (
  src: string,
  position: HTMLElement | null,
  id: string
) => {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
};

// export const getGeoHash = (_geoloc: { lat: number; lng: number }) => {
//   const hash = geofire?.geohashForLocation([_geoloc.lat, _geoloc.lng]);
//   return hash;
// };

export const setVerifiedCookie = (val: string) => {
  // Set a cookie
  const cookieName = "userVerified";
  const cookieValue = val;
  const cookieOptions = {
    path: "/",
    expires: 7,
    //httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
  };
  console.log("setting cookie", cookieName, cookieValue, cookieOptions);
  Cookies.set(cookieName, cookieValue, cookieOptions);
  //setCookie(cookieName, cookieValue, cookieOptions);
};

export const deleteVerifiedCookie = () => {
  Cookies.remove("userVerified");
};

export const getVerifiedCookie = () => {
  return Cookies.get("userVerified");
};

export const truncateText = (str: string, n: number, b?: boolean) => {
  if (str.length <= n) {
    return str;
  }
  const useWordBoundary = b != null ? b : true;
  const subString = str.substring(0, n - 1); // the original check
  return useWordBoundary
    ? subString.substring(0, subString.lastIndexOf(" "))
    : subString;
};
