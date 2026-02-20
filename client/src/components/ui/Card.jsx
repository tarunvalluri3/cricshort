const Card = ({ children }) => {
  return (
    <div className="bg-[var(--color-surface)] rounded-xl shadow-md p-4">
      {children}
    </div>
  );
};

export default Card;