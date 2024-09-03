import WebDevBlogList from "./WebDevBlogList";
import useFetchItems from "./useFetchItems";

const WebDevBlogHome = () => {
  const { data: blogs, isPending, error} = useFetchItems('http://localhost:8000/blogs');
  return ( 
    <div className="home">
    {error && <div>{ error }</div>}
    {isPending && <div>Loading...</div>}
    {blogs && <WebDevBlogList blogs={blogs} title="All Blogs!" />}
  </div>
   );
}
 
export default WebDevBlogHome;