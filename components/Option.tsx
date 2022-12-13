import classNames from "classnames";
import React from "react";

const Option = ({
  clickable = true,
  onClick = null,
  header,
  id,
  isActive = false,
}: {
  link?: string | null;
  clickable?: boolean;
  onClick?: null | (() => void);
  header: React.ReactNode;
  isActive?: boolean;
  id: string;
}) => {
  return (
    <div
      id={id}
      className={classNames(
        isActive && "bg-red-300",
        clickable && "border broder-black"
      )}
      onClick={onClick as any}
    >
      <div>{header}</div>
    </div>
  );
};

export default Option;
