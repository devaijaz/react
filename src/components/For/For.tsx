import React, { FC } from "react";

export type ForProps<T = any> = {
  each: Array<T>;
  children: (item: T, index: number, array: Array<T>) => React.ReactNode;
};
export const For: FC<ForProps> = ({ each, children }) => {
  return (
    <>
      {each?.map(function (item, index) {
        return children(item, index, each);
      })}
    </>
  );
};
