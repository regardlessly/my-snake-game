import dynamic from "next/dynamic";

const MathInput = dynamic(() => import("./math-input"), { ssr: false });

export default MathInput;
