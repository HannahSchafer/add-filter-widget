import { useEffect } from "react";

const useOutsideClick = (
  callback: () => void,
  excludeClasses: string[] = [],
) => {
  useEffect(() => {
    if (typeof callback !== "function") {
      console.error("useOutsideClick: callback is not a valid function.");
      return;
    }

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const classesToExclude = Array.isArray(excludeClasses)
        ? excludeClasses
        : [];

      if (classesToExclude.some((cls) => target.closest(`.${cls}`))) {
        return;
      }

      callback();
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback, excludeClasses]);
};

export default useOutsideClick;
