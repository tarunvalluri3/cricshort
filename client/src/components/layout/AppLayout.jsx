const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 w-full max-w-md mx-auto px-5 pt-6 pb-24">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;