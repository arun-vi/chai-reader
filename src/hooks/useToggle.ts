import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return { isOpen, open, close, toggle };
}