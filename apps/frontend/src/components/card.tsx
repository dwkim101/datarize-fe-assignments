export const Card = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4 border rounded-md p-4">{children}</div>;
};

Card.Title = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-lg font-bold">{children}</div>;
};

Card.Description = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-sm text-gray-900 dark:text-gray-100">{children}</div>;
};
