import { FiCheck, FiTrendingUp } from "react-icons/fi";

const AddCategoryButton = () => {
  return (
    <button
      type="submit"
      className="w-full px-6 py-3 text-white font-medium rounded-xl
                    bg-gradient-to-r from-blue-600 to-blue-500 
                    hover:from-blue-700 hover:to-blue-600 
                    transition-all duration-300 
                    shadow-[0_1px_2px_rgba(0,0,0,0.1),0_4px_12px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_1px_3px_rgba(0,0,0,0.12),0_8px_24px_rgba(0,0,0,0.12)]
                    transform hover:-translate-y-0.5
                    flex items-center justify-center space-x-2
                    relative overflow-hidden group"
    >
      <div className="relative flex items-center gap-2">
        <FiCheck className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
        <span className="relative">
          Create Category
          <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/20 transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
        </span>
        <FiTrendingUp className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
      </div>

      {/* Hover Effect Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 
                    transform -translate-x-full transition-transform duration-700 
                    group-hover:translate-x-full"
      />
    </button>
  );
};

export default AddCategoryButton;
