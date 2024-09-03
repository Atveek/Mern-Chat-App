import { animationDefaultOption } from "@/lib/utils";
import Lottie from "react-lottie";

function EmptyChatContainer() {
  return (
    <div className="flex-1 md:bg-[#1c1d25] flex-col md:flex justify-center items-center hidden duration-100 transition-all">
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOption}
      ></Lottie>
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        {" "}
        <h3 className="poppins-medium">
          Hi <span className="text-purple-500 ">!</span>Welcome to
          <span className="text-purple-500"> Chatter Space </span> App
          <span className="text-purple-500">.</span>
        </h3>
      </div>
    </div>
  );
}

export default EmptyChatContainer;
