import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";

const API_URL = "http://localhost:5005";

export default function HostProfilePage(props) {
  const { user } = useContext(AuthContext);
  const [host, setHost] = useState({
    name: "",
    email: "",
  });

  const { profileId } = useParams();

  function getHost() {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/hosts/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneHost = response.data;
        setHost(oneHost);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getHost();
  }, []);

  return (
    <div>
      <h1>Welcome, {host.name}</h1>
      <p>{host.description}</p>
      <span>{host.location}</span>
      <Link to={`/profile/${user._id}/edit`}>
        <button>Edit Profile</button>
      </Link>
    </div>
  );
}
