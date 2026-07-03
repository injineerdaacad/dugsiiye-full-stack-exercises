const Simulation = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold">SSR Simulation</h1>
      <p className="text-xl pt-4">{new Date().toLocaleTimeString()}</p>
    </div>
  );
};

export default Simulation;
