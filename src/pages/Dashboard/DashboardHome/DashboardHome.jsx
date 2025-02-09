import Lottie from "lottie-react";
import dashboardAnimation from "../../../assets/animation/dashboardAnimation.json"

const DashboardHome = () => {
  return (
    <div>
      <header className="flex flex-col justify-center items-center">
        <div className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px]">
          <Lottie animationData={dashboardAnimation} loop={false} autoplay={true}></Lottie>
        </div>
      </header>
    </div>
  );
};

export default DashboardHome;
