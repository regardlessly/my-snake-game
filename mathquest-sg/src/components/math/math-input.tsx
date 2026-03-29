"use client";

import { useEffect, useRef, useCallback } from "react";
import "mathlive";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Radical,
  Superscript,
  Divide,
  Plus,
  Minus,
  Pi,
  PlusCircle,
} from "lucide-react";

interface MathInputProps {
  value: string;
  onChange: (latex: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "math-field": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          ref?: React.Ref<HTMLElement>;
        },
        HTMLElement
      >;
    }
  }
}

const TOOLBAR_BUTTONS = [
  { label: "Fraction", icon: Divide, command: "\\frac{#@}{#?}" },
  { label: "Power", icon: Superscript, command: "#@^{#?}" },
  { label: "Square root", icon: Radical, command: "\\sqrt{#@}" },
  { label: "Pi", icon: Pi, command: "\\pi" },
  { label: "Plus/Minus", icon: PlusCircle, command: "\\pm" },
] as const;

export default function MathInput({
  value,
  onChange,
  placeholder = "Type math here...",
  disabled = false,
  className,
}: MathInputProps) {
  const mathFieldRef = useRef<HTMLElement | null>(null);
  const showToolbar = useRef(true);

  const handleInput = useCallback(
    (evt: Event) => {
      const target = evt.target as HTMLElement & { value: string };
      onChange(target.value);
    },
    [onChange]
  );

  useEffect(() => {
    const mf = mathFieldRef.current;
    if (!mf) return;

    mf.addEventListener("input", handleInput);
    return () => mf.removeEventListener("input", handleInput);
  }, [handleInput]);

  // Sync external value changes
  useEffect(() => {
    const mf = mathFieldRef.current as HTMLElement & { value: string } | null;
    if (mf && mf.value !== value) {
      mf.value = value;
    }
  }, [value]);

  const insertCommand = (command: string) => {
    const mf = mathFieldRef.current as HTMLElement & {
      executeCommand: (cmd: [string, string]) => void;
      focus: () => void;
    } | null;
    if (!mf) return;
    mf.executeCommand(["insert", command]);
    mf.focus();
  };

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {showToolbar.current && (
        <div className="flex gap-1 flex-wrap">
          {TOOLBAR_BUTTONS.map((btn) => (
            <Button
              key={btn.label}
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              title={btn.label}
              disabled={disabled}
              onClick={() => insertCommand(btn.command)}
            >
              <btn.icon className="size-3.5" />
            </Button>
          ))}
        </div>
      )}
      <math-field
        ref={mathFieldRef}
        className={cn(
          "w-full min-h-[40px] rounded-md border border-input px-3 py-2 text-sm",
          "bg-background text-foreground",
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background",
          disabled && "opacity-50 pointer-events-none"
        )}
        style={
          {
            "--caret-color": "white",
            "--selection-background-color": "hsl(var(--primary) / 0.3)",
            "--contains-highlight-background-color": "transparent",
            "--primary-color": "white",
            "--text-font-family": "inherit",
            fontSize: "16px",
          } as React.CSSProperties
        }
      />
    </div>
  );
}
