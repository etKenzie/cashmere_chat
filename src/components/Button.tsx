import Image from "next/image";
import React from "react";

interface ButtonProps {
  type: "button" | "submit";
  title: string;
  icon?: string;
  className: string;
}

const Button = ({ type, title, icon, className }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`flexCenter gap-3 rounded-full border ${className}`}
    >
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <label className="bold-16 whitespace-nowrap cursor-pointer">
        {title}{" "}
      </label>
    </button>
  );
};

export default Button;
