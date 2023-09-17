import { useNavigate } from "react-router-dom";

function ButtonLevel({ Text, Link }) {
  const navigate = useNavigate();
  const hoverButtonLevel =
    "hover:text-white hover:bg-red-600 hover:border-white hover:border-2 hover:scale-105";
  const transitionButtonLevel = "transition duration-500 ease-in-out transform";

  return (
    <button
      className={`text-red-600 bg-white w-[90%] rounded-lg text-2xl border-2 border-transparent my-2 py-1 font-medium ${hoverButtonLevel} ${transitionButtonLevel}`}
      onClick={() => navigate(`${Link}`)}
    >
      {Text}
    </button>
  );
}

export default ButtonLevel;
