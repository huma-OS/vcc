import { useNavigate, useParams } from "react-router-dom";
import useFetchItems from "./useFetchItems";

const WebDevBlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetchItems('http://localhost:8000/blogs/' + id);
  const history = useNavigate();

  const handleClick = () => {
    fetch('http://localhost:8000/blogs/' + blog.id, {
      method: 'DELETE'
    }).then(() => {
      history.push('/');
    })
  }
  return ( 
    <div className="blog-details">
      {/* <h2>Blog Details - { id }</h2> */}
      {isPending && <div>Loading...</div>}
      {error && <div>{ error }</div>}
      { blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by { blog.author}</p>
          <div>{ blog.body }</div>
          <button onClick={handleClick}>delete</button>
        </article>
      )}
    </div>
   );
}
 
export default WebDevBlogDetails;