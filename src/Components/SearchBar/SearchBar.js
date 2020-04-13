import React,{useEffect} from 'react';
import { useRouter } from 'next/router';



export const SearchMovies=(props)=>{

    const router = useRouter();
    const [movieName,setMovieName]=React.useState('');

    useEffect(() => {

        const movName=sessionStorage.getItem("moviename");
        if(movName){
            setMovieName(movName)
        }

    }, [])
 
    const handleNameSearch=(e)=>{
        setMovieName(e.target.value)
       
    }
    const handleMovieSearch= async (e)=>{

        
        if(!movieName){
            alert("Movie name cannot be blank")
        }else{

            sessionStorage.setItem("moviename",movieName)
            
            router.push({
                pathname:'/productList',
                query:{moviename:movieName}
            })

        }
    
    }
 

    return (
        <div>
            <div className="input-group mb-9">
                    <input 
                     onChange={handleNameSearch}
                     value={movieName}
                     type="text" 
                     className="form-control" 
                     placeholder="Movie Name" 
                     aria-label="Movie Name" 
                     aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                        <button onClick={handleMovieSearch} className="btn btn-danger" type="button">Search</button>
                    </div>
                 
            </div>
        </div>
    )

}