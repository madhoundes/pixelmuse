import React from 'react';
import { cn } from '../../utils/cn';

interface ToggleProps {
  isActive: boolean;
  onToggle: () => void;
  label: string;
  disabled?: boolean;
}

const Toggle: React.FC<ToggleProps> = ({ 
  isActive, 
  onToggle, 
  label,
  disabled = false
}) => {
  return (
    <button
      role="switch"
      aria-checked={isActive}
      aria-label={label}
      disabled={disabled}
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
        isActive ? "bg-purple-600" : "bg-gray-700",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          isActive ? "translate-x-6" : "translate-x-1"
        )}
      />
      <span className="sr-only">{label}</span>
    </button>
  );
};

export default Toggle;