import Lottie from "lottie-react";
import loginAnimation from "../../assets/animation/loginAnimation.json";
import downArrow from "../../assets/animation/down-arrow.json";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
  const { loginUserEmail, signInAsGuest, setLoading } = useAuth();
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.loginEmail.value;
    const password = form.loginPassword.value;

    try {
      await loginUserEmail(email, password);
      Swal.fire({
        title: "Login Successful!",
        text: "Welcome to our platform!",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay!",
      });
    } finally {
      setLoading(false)
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAsGuest();
      Swal.fire({
        title: "Guest Login!",
        text: "Welcome to our platform!",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        navigate("/dashboard");
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Okay!",
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-300 flex lg:py-[100px]">
      <div className="flex flex-col lg:flex-row gap-10 justify-between items-center max-w-[88%] mx-auto w-full py-16 lg:py-0">
        {/* Animation div */}
        <div className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px]">
          <Lottie animationData={loginAnimation}></Lottie>
        </div>
        {/* Animation div */}

        {/* Login Form div */}
        <div className="w-full lg:w-[50%]">
          <div className="flex justify-center gap-2 mb-4">
            <div>
              <h1 className="text-center font-bold text-2xl">Login Here</h1>
            </div>
            <div>
              <Lottie className="w-10" animationData={downArrow}></Lottie>
            </div>
          </div>
          <div className="card bg-base-100 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input input-bordered"
                  name="loginEmail"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  className="input input-bordered"
                  name="loginPassword"
                  required
                />
              </div>
              <div className="form-control mt-3">
                <button className="btn bg-sky-500">Login</button>
              </div>
              <div className="form-control mt-3">
                <button onClick={handleGuestLogin} className="btn bg-sky-500">Login as Guest</button>
              </div>
              <div className="text-center mt-3">
                <NavLink to={"/register"}>
                  Do not have an account?{" "}
                  <span className="font-bold">Register Here!</span>{" "}
                </NavLink>
              </div>
            </form>
          </div>
        </div>
        {/* Login Form div */}
      </div>
    </div>
  );
};

export default Login;
