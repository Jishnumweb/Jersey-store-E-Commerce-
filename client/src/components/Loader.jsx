// src/components/Loading.jsx
const Loader = () => {
    return (
      <div className="flex justify-center items-center h-full py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-t-transparent border-red-500"></div>
        <p className="ml-3 text-black font-semibold">Loading...</p>
      </div>
    );
  };
  
  export default Loader;
  