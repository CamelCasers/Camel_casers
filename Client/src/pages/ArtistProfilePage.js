import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./../context/auth.context";
import YoutubeUpload from "../components/YoutubeUpload";
import ImagesCarrousel from "../components/ArtistProfile/ImagesCarrousel"

const API_URL = "http://localhost:5005";

export default function ArtistProfilePage(props) {
  const { user } = useContext(AuthContext);
  const [artist, setArtist] = useState({
    name: "",
    email: "",
    musicStyle: [],
    images: [],
    videos: []
  });
  const [videosFiltered , setVideosFiltered] = useState([])

  const { profileId } = useParams();

  function getArtist() {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/artists/${profileId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneArtist = response.data;
        setArtist(oneArtist);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    getArtist();
  }, []);

  let isArtistOwner = false;
  if(user){

    if (profileId === user._id) isArtistOwner = true;

  }

  
  useEffect(()=>{
    const videos = artist.videos.filter((video)=>{
       return (video !== "")
     })
 
     setVideosFiltered(videos)
   },[artist.videos])

  return (
    <div>
    <h1>Welcome, {artist.name}</h1>

    <p className="center">Artist Images</p>
   

    <ImagesCarrousel artist={artist}/>

    <p>Youtube Embed</p>
    {videosFiltered.map((video)=>(
    <YoutubeUpload embedId={video} />
    ))}
  

    <p>Description: {artist.description}</p>
    <p>Music Style: {artist.musicStyle}</p>

    {artist.musicStyle.map((styles) => (
      <li>{styles}</li>
    ))}

    {isArtistOwner && (
      <Link to={`/profileArtist/${user._id}/edit`}>
        <button>Edit Profile</button>
      </Link>
    )}
  </div>
  );
}
