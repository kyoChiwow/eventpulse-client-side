import Lottie from "lottie-react";
import downArrow from "../../../assets/animation/down-arrow.json";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CreateEvents = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const eventEmail = form.eventEmail.value;
    const eventName = form.eventName.value;
    const eventTime = new Date(form.eventTime.value);
    const eventDescription = form.eventDescription.value;
    const eventImage = form.eventImage.files[0];

    const imageData = new FormData();
    imageData.append("file", eventImage);
    imageData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const imageRes = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );
      const imageResult = await imageRes.json();
      const imageUrl = imageResult.secure_url;

      const eventData = {
        eventEmail,
        eventName,
        eventDescription,
        eventTime,
        eventImage: imageUrl,
        attendees: 0,
      };

      // eslint-disable-next-line no-unused-vars
      const res = await axiosSecure.post("/events", eventData);
      Swal.fire({
        title: "Event Add Successful!",
        text: "You have successfully added your event!",
        icon: "success",
        confirmButtonText: "Okay!",
      }).then(() => {
        form.reset();
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
    <div className="max-w-[88%] mx-auto">
      <div className="w-full mt-10">
        <div className="card bg-base-100 shadow-2xl">
          <div className="flex justify-center gap-2 mt-6">
            <div>
              <h1 className="text-center font-bold text-2xl">
                Create Event Here
              </h1>
            </div>
            <div>
              <Lottie className="w-10" animationData={downArrow}></Lottie>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="form-control lg:w-[49%]">
                <label className="label">
                  <span className="label-text">Event Creator Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter Event Creator Email"
                  className="input input-bordered"
                  name="eventEmail"
                  value={user.email}
                  readOnly
                  required
                />
              </div>
              <div className="form-control lg:w-[49%]">
                <label className="label">
                  <span className="label-text">Event Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter Event Name"
                  className="input input-bordered"
                  name="eventName"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
              <div className="form-control lg:w-[49%]">
                <label className="label">
                  <span className="label-text">Event Date and Time</span>
                </label>
                <input
                  type="datetime-local"
                  placeholder="Enter Event Date and Time"
                  className="input input-bordered"
                  name="eventTime"
                  required
                />
              </div>
              <div className="form-control lg:w-[49%]">
                <label className="label">
                  <span className="label-text">Event Picture</span>
                </label>
                <input
                  required
                  type="file"
                  name="eventImage"
                  className="file-input file-input-bordered w-full"
                />
              </div>
            </div>

            <div className="mt-3">
              <textarea
                placeholder="Enter Event Description"
                name="eventDescription"
                className="textarea textarea-bordered w-full textarea-lg h-[200px]"
                required
              ></textarea>
            </div>

            <div className="form-control mt-3">
              <button className="btn bg-sky-500">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
