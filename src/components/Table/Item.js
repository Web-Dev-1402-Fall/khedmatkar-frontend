import React from "react";

const Item = ({}) => {
  return (
    <div
      className={classJoin([
        "flex items-center justify-between rounded-md bg-white-background p-2 hover:bg-gray-card_border",
        className,
      ])}
    >
      <div className="flex flex-1 items-center">
        <img
          width={22}
          height={22}
          src={`/icons/${role === "operator" ? "operator" : "customer"}.svg`}
          alt="user"
        />
        <span className="text-gray-dark mr-2 text-[15px]">{name}</span>
      </div>
      <span className="text-gray-dark mr-2 flex-1 text-center text-[15px]">
        {role === "operator" ? "کارمند" : "مشتری"}
      </span>
      <span className="text-gray-dark mr-2 flex-1 text-center text-[15px]">
        {email}
      </span>
      <span className="text-gray-dark mr-2 flex-1 text-end text-[15px]">
        {getDateAsText(joinedAt)}
      </span>
    </div>
  );
};

export default Item;
