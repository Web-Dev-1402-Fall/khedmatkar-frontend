import React from "react";

const Table = ({ headers, items }) => {
  return (
    <div>
      <div className="my-4 flex items-center justify-around rounded-md bg-gray-primary p-2 text-white">
        {headers?.map((h, index) => (
          <span className="text-gray-dark mr-2 flex-1 text-[15px]">{h}</span>
        ))}
      </div>
      {items.length > 0
        ? items.map((it, index) => (
            <Item
              key={index}
              name={member.user.full_name}
              email={member.user.email}
              role={member.member_type}
              joinedAt={member.date_joined}
              className="mb-4"
            />
          ))
        : []}
    </div>
  );
};

export default Table;
