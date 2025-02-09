import Lottie from "lottie-react";
import registerAnimation from "../../assets/animation/registerAnimation.json";
import downArrow from "../../assets/animation/down-arrow.json";
import { NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const Register = () => {
  const { createUserEmail, updateUser } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (loading) return;

    const form = e.target;
    const name = form.registerName.value;
    const email = form.registerEmail.value;
    const password = form.registerPassword.value;
    const imageFile = form.registerImage.files[0];

    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordPattern.test(password)) {
      Swal.fire(
        "Weak Password",
        "Password must be at least 6 characters long and include uppercase, lowercase, and a number.",
        "error"
      );
      return;
    }

    if (!imageFile) {
      alert("Please select an image");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const cloudinaryData = await cloudinaryRes.json();
      const imageURL = cloudinaryData.secure_url;

      const userCredential = await createUserEmail(email, password);
      const user = userCredential.user;
      await updateUser({ displayName: name, photoURL: imageURL });

      const userData = {
        uid: user.uid,
        name,
        email,
        image: imageURL,
        role: "user",
      };

      await axiosPublic.post("/users", userData);

      Swal.fire({
        title: "Registration Successful!",
        text: "Welcome to our platform!",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        navigate("/dashboard");
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen bg-base-300 flex lg:py-[100px]">
      <div className="flex flex-col lg:flex-row-reverse gap-10 justify-between items-center max-w-[88%] mx-auto w-full py-16 lg:py-0">
        {/* Animation div */}
        <div className="w-[300px] md:w-[400px] lg:w-[500px] xl:w-[550px]">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>
        {/* Animation div */}

        {/* Login Form div */}
        <div className="w-full lg:w-[50%]">
          <div className="flex justify-center gap-2 mb-4">
            <div>
              <h1 className="text-center font-bold text-2xl">Register Here</h1>
            </div>
            <div>
              <Lottie className="w-10" animationData={downArrow}></Lottie>
            </div>
          </div>
          <div className="card bg-base-100 shadow-2xl">
            <form onSubmit={handleRegister} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  className="input input-bordered"
                  name="registerName"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input input-bordered"
                  name="registerEmail"
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
                  name="registerPassword"
                  required
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Choose Picture</span>
                </label>
                <input
                  type="file"
                  className="file-input file-input-bordered w-full"
                  name="registerImage"
                  required
                />
              </div>
              <div className="form-control mt-3">
                <button className="btn bg-sky-500" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
              <div className="text-center mt-3">
                <NavLink to={"/login"}>
                  Already have an account?{" "}
                  <span className="font-bold">Login Here!</span>{" "}
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

export default Register;
