
type ButtonProps = {
  text: string;
  px: string;
  py: string;
};

export default function Button({ text, px, py }: ButtonProps) {
  return (
    <div>
      <button
        type="button"
        className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        style={{  paddingLeft: px, paddingRight: px, paddingTop: py, paddingBottom: py }}
      >
        <p >{text}</p>
      </button>
    </div>
  );
}
