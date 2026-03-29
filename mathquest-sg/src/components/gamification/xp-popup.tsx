"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface XpPopupProps {
  xp: number;
  onComplete?: () => void;
}

export function XpPopup({ xp, onComplete }: XpPopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible || xp <= 0) return null;

  return (
    <div className="fixed top-20 right-8 z-50 animate-bounce">
      <div className="flex items-center gap-2 rounded-full bg-yellow-500/20 border border-yellow-500/40 px-4 py-2 text-yellow-400 font-bold">
        <Zap className="size-4" />
        +{xp} XP
      </div>
    </div>
  );
}
