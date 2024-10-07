import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function PostPage(){
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const {userInfo}=useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:4000/post/${id}`)
        .then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
            });
        });
    }, []);

    if (!postInfo)
    {
        return '';
    };

    return (

           <div className="post-page">
            <h1> {postInfo.title}</h1>
            <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div>
                    <a href="">Edit This Post</a>
                    </div>
        
            )}
            <div className="image">
            <img src={`http://localhost:4000/${postInfo.cover}`} alt={postInfo.title} />

            </div>
            <div className="content" dangerouslySetInnerHTML={{__html:postInfo.content}}/>
        </div>
    );
}
