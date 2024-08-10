"use client";
import { useEffect, useState } from "react";

const UseInView = (sectionIds) => {
  console.log(
    sectionIds,
    "sectionIdssectionIdssectionIdssectionIdssectionIdssectionIdssectionIdssectionIds"
  );
  const [intersectingId, setIntersectingId] = useState(null);

  useEffect(() => {
    const handleObserver = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIntersectingId(entry.target.id);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sectionIds]);

  return intersectingId;
};

export default UseInView;
