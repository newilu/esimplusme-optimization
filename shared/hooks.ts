import React from "react";

function useOutsideClick(
  elementRef: React.RefObject<any>,
  onOutsideClick: (event: any) => void
) {
  React.useEffect(() => {
    function handleClickOutside(event: Event) {
      if (elementRef.current && !elementRef.current.contains(event.target)) {
        onOutsideClick(event);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [elementRef, onOutsideClick]);
}

function useModalControls(
  initState = false,
  options?: { disableBodyScroll?: boolean }
) {
  const [isOpen, setIsOpen] = React.useState(initState);

  const openModal = React.useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);
  }, []);

  React.useEffect(() => {
    if (options?.disableBodyScroll) {
      const escapeKeyListener = (e: KeyboardEvent) =>
        e.code === "Escape" && closeModal();

      if (isOpen) {
        window.addEventListener("keydown", escapeKeyListener);
        document.body.setAttribute("style", "overflow:hidden;");
        document
          .querySelector("html")
          ?.setAttribute("style", "overflow:hidden;");
      } else {
        window.removeEventListener("keydown", escapeKeyListener);
        document.body.removeAttribute("style");
        document.querySelector("html")?.removeAttribute("style");
      }
    }
  }, [closeModal, isOpen, options?.disableBodyScroll]);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}

function useInView(
  ref: React.RefObject<HTMLElement>,
  options?: { rootMargin?: string; once?: boolean }
) {
  const [isVisible, setIsVisible] = React.useState(false);
  React.useEffect(() => {
    if (ref.current !== null) {
      const el = ref.current;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (options?.once) {
            if (!isVisible) {
              setIsVisible(entry.isIntersecting);
            }
          } else {
            setIsVisible(entry.isIntersecting);
          }
        },
        { rootMargin: options?.rootMargin }
      );

      observer.observe(el);

      return () => observer.unobserve(el as Element);
    }
  }, [isVisible, options, ref]);

  return isVisible;
}

export { useModalControls, useOutsideClick, useInView };
