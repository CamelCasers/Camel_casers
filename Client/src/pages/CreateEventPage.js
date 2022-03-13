import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";

function CreateEventPage(props) {
  const { user } = useContext(AuthContext);
  console.log("user 0=>", user);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState("");
  const [videos, setVideos] = useState("");
  const [musicStyle, setMusicStyle] = useState("");
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState("");
  const [equipment, setEquipment] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      title,
      date,
      location,
      images,
      videos,
      musicStyle,
      description,
      timeRange,
      equipment,
      user,
    };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // Send the token through the request "Authorization" Headers
    axios
      .post(`${API_URL}/api/events`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        // Reset the state
        setTitle("");
        setDate("");
        setLocation("");
        setImages("");
        setVideos("");
        setMusicStyle("");
        setDescription("");
        setTimeRange("");
        setEquipment("");
        //props.refreshEvents();

        navigate(`/events/`);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label>Event title: </label>
          <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          </div>
        </div>
        <div className="row mb-3">
          <label>Date: </label>
          <div className="col-sm-10">
          <input
            className="form-control"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          </div>
        </div>
        <div className="row mb-3">
          <label>Time:</label>
          <div className="col-sm-10">
          <input
            type="time"
            min=""
            max
            name="timeRange"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          />
          </div>
        </div>
        <div className="row mb-3">
          <label>Location: </label>
          <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          </div>
        </div>
        <div className="row mb-3">
          <label>Description:</label>
          <div className="col-sm-10">
          <textarea
            className="form-control"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          </div>
        </div>
                <div className="row mb-3">
          <label>Music Style: </label>
          <div className="col-sm-10">
          <select
            type="text"
            name="musicStyle"
            value={musicStyle}
            onChange={(e) => setMusicStyle(e.target.value)}
          >
            <option value="rock">Rock</option>
            <option value="reggae">Reggae</option>
            <option value="Pop">Pop</option>
            <option value="romantic">Romantic</option>
            <option value="party">Party</option>
            <option value="swing">Swing</option>
            <option value="heavy">Heavy</option>
            <option value="others">Others</option>
          </select>
          </div>
        </div>

        <div className="row mb-3">
          <label>Equipment Provided:</label>
          <div className="col-sm-10">
          <input
            className="form-control"
            type="text"
            name="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
          </div>
        </div>


        <div className="row mb-3">
          <label>Event Images: </label>
          <div className="col-sm-10">
          <input
            type="file"
            name="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
          </div>
        </div>

        <div className="row mb-3">
          <label>Upload Event Videos: </label>
          <div className="col-sm-10">
          <input
            className="form-control"
            type="file"
            name="videos"
            value={videos}
            onChange={(e) => setVideos(e.target.value)}
          />
          </div>
        </div>




        <button className="btn btn-secondary" type="submit">
          {" "}
          Create Event
        </button>
      </form>
    </div>
  );
}

export default CreateEventPage;
