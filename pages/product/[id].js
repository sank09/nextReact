import { useRouter } from 'next/router'

const Blog = (props) => {
 
const router = useRouter();	
const { id } = router.query;
return <div><p>Post: new blog {id}</p>
  	
  </div>
}

export default Blog