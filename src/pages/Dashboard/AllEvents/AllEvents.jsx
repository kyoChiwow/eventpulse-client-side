import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import { MdEventSeat } from "react-icons/md";
import { io } from "socket.io-client";
import downArrow from "../../../assets/animation/down-arrow.json";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Loading from "../../Loading/Loading";

const socket = io("https://eventpulse-server-side.onrender.com", {
  withCredentials: true,
  transports: ["websocket"],
});

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let url = "/events";
        if (filter !== "all") {
          url += `?filter=${filter}`;
        }
        const response = await axiosPublic.get(url);
        setEvents(response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();

    // Listen for real-time updates here
    socket.on("events", (data) => {
      setEvents(data);
    });

    socket.on("updateAttendees", (updatedEvent) => {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent.eventId
            ? { ...event, attendees: updatedEvent.attendees }
            : event
        )
      );
    });

    return () => {
      socket.off("events");
      socket.off("updateAttendees");
    };
  }, [axiosPublic, filter]);

  const handleJoinEvent = (eventId) => {
    if (eventId) {
      socket.emit("joinEvent", { eventId });
    }
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="max-w-[88%] mx-auto">
      {/* Filter thing here */}
      <div className="flex justify-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn m-1">
            Filter By
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 gap-2 shadow"
          >
            <li>
              <button
                className={`btn btn-ghost ${
                  filter === "all" ? "bg-blue-400 text-black" : "bg-gray-200"
                }`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`btn btn-ghost ${
                  filter === "upcoming"
                    ? "bg-blue-400 text-black"
                    : "bg-gray-200"
                }`}
                onClick={() => setFilter("upcoming")}
              >
                Upcoming
              </button>
            </li>
            <li>
              <button
                className={`btn btn-ghost ${
                  filter === "past" ? "bg-blue-400 text-black" : "bg-gray-200"
                }`}
                onClick={() => setFilter("past")}
              >
                Past
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Filter thing here */}

      {/* Table Div here */}
      <main className="bg-white mt-4 rounded-lg">
        <div className="flex justify-center items-center gap-2">
          <h1 className="text-center py-6 text-xl font-bold">
            All Events Here
          </h1>
          <Lottie className="w-10" animationData={downArrow}></Lottie>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Event Name</th>
                <th>Event Creator Email</th>
                <th>Event Date and Time</th>
                <th>Attendees List</th>
                <th>Click To Join</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="my-4 text-center font-bold text-xl"
                  >
                    No events found
                  </td>
                </tr>
              ) : (
                events.map((event, idx) => (
                  <tr key={idx}>
                    <th>
                      <label>{idx + 1}</label>
                    </th>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={
                                event.eventImage ||
                                "https://img.daisyui.com/images/profile/demo/2@94.webp"
                              }
                              alt="event image"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{event.eventName}</div>
                        </div>
                      </div>
                    </td>
                    <td>{event.eventEmail}</td>
                    <td>
                      {event.eventTime
                        ? event.eventTime.replace("T", " ")
                        : "N/A"}
                    </td>
                    <th>{event.attendees}</th>
                    <th>
                      <button
                        onClick={() => handleJoinEvent(event._id)}
                        className="btn btn-ghost text-xl"
                      >
                        <MdEventSeat />
                      </button>
                    </th>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
      {/* Table Div here */}
    </div>
  );
};

export default AllEvents;
