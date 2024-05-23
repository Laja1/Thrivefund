import { Link } from "react-router-dom";

type ButtonProps = {
  text: string;
  px: string;
  py: string;
 to: string;
};

export default function Button({ text, px, py,to }: ButtonProps) {
  return (
    <div>
     <Link to={to}> <button
        type="button"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        style={{  paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py }}
      >
        <p >{text}</p>
      </button></Link>
    </div>
  );
}
