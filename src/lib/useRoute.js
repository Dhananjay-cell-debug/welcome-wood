import { useEffect, useState } from "react";

function readRoute() {
  const hash = window.location.hash.slice(1);
  // Traditional section anchors remain compatible with the original homepage.
  if (!hash.startsWith("/")) return null;
  const [path, query = ""] = hash.split("?");
  return { path: path.replace(/\/$/, "") || "/", query };
}

export default function useRoute() {
  const [route, setRoute] = useState(
    () => readRoute() || { path: "/", query: "" },
  );
  useEffect(() => {
    const onChange = () => {
      const next = readRoute();
      if (next) setRoute(next);
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return { ...route, params: new URLSearchParams(route.query) };
}
