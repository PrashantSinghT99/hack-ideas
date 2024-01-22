import React, { useEffect, useState } from "react";
//import data from "../../utils/data";
import IdeaCard from "../IdeaCard/IdeaCard";
import "./Ideas.css";
import UnauthorizedFallback from "../Fallback/UnauthorizedFallback";
import { ChatContextState } from "../../context/Context";
import { getAllIdeas } from "../../helper/apis";
const Ideas = () => {
  const { token } = ChatContextState();
  const [ideaData, setIdeaData] = useState([]);
  const [refetch, setRefetch] = useState(false);
  //console.log(ideaData);
  const fetchIdeasData = async () => {
    let data = await getAllIdeas(token);
    setIdeaData(data.data);
  };
  useEffect(() => {
    fetchIdeasData();
  }, [refetch]);

  // useEffect(() => {
  //   fetchIdeasData();
  // }, []);

  if (token) {
    return (
      <div className="notes-container">
        {ideaData.map((note) => (
          <IdeaCard note={note} key={note._id} setRefetch={setRefetch} refetch={refetch} />
        ))}
      </div>
    );
  } else return <UnauthorizedFallback />;
};

export default Ideas;
