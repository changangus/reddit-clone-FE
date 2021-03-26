import Navbar from "../components/Navbar";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGetAllPostsQuery } from "../generated/graphql";

const Index = () => {
  const [{data}] = useGetAllPostsQuery();
  return (
    <div>
      <Navbar />
      {!data ?  <h1>Loading.....</h1> : data.posts.map(post => (
        <div key={post.id}>
          <h1>{post.title}</h1>
        </div>
        
      ))}

    </div>
  )
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index)
