import React from "react";

export const Card = ({ children }: { children: React.ReactNode }) => {
  return <section className="flex flex-col gap-4 border rounded-md p-4">{children}</section>;
};

Card.Title = React.memo(({ children }: { children: React.ReactNode }) => {
  return <div className="text-lg font-bold">{children}</div>;
});

Card.Description = React.memo(({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm text-gray-500">{children}</div>;
});
