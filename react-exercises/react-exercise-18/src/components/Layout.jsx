const Layout = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      {children}
    </div>
  );
};

export default Layout;