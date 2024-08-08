import React from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";

type NavItemProps = {
  icon?: any;
  label?: string;
  active?: boolean;
  onClick?: () => void;
  dropdown?: boolean;
  open?: boolean;
  path?: string;
  noLink?: boolean;
};

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  active,
  onClick,
  dropdown,
  open,
  path,
  noLink,
}) => {
  const content = (
    <>
      {React.cloneElement(icon, { className: "w-6 h-6 mr-2" })}
      <span className="flex-1">{label}</span>
      {dropdown && (
        <span className="ml-auto">
          {open ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </span>
      )}
    </>
  );

  const className = `flex items-center p-2 rounded-lg cursor-pointer
    ${active ? "bg-white text-blue-600" : "text-white hover:bg-blue-700"}`;

  if (noLink || label === "Logout") {
    return (
      <div className={className} onClick={onClick}>
        {content}
      </div>
    );
  }

  return (
    <Link href={path} className={className} onClick={onClick}>
      {content}
    </Link>
  );
};

export default NavItem;
