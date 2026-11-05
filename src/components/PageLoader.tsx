const PageLoader = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] animate-bounce transition ease-in-out"
        style={{ animationDuration: "0.3s" }}
      ></span>
      <span
        className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] animate-bounce"
        style={{ animationDelay: "0.15s" , animationDuration: "0.3s" }}
      ></span>
      <span
        className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7a4cf5] to-[#4f7cff] animate-bounce"
        style={{ animationDelay: "0.3s" , animationDuration: "0.3s" }}
      ></span>
    </div>
  );
};

export default PageLoader;