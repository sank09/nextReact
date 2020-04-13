import React,{useEffect} from 'react';
import Link from 'next/link';

export default function Listing(props) {

    const [movies,setMovies]=React.useState([]);
    const [moviesErr,setMovieErr]=React.useState('');
    const {movieName}=props;
    const [isLoading,setLoading]=React.useState(true);

    useEffect(()=>{
            const movieData= fetchMoviData(movieName);   
            movieData.then(data=>{

                handleMovies(data);
            })
            .catch(err=>{

                handleMovies(0);
            })
           
    },[movieName]);
    

    const handleMovies=(data)=>{

        console.log(data)
        if(! data ){
            console.log("dsdsds")
            setLoading(false)
            setMovies([]);
            setMovieErr("Something went wrong")
            
        }else{

            if(data.Response=="False"){
                console.log("Fasle")
                setLoading(false)
                setMovies([]);
                setMovieErr(data.Error);
    
             }
             else{
                console.log("True")
                setLoading(false)
                setMovies(data.Search);
                setMovieErr('');
 
              }
        
        
         }

    }

    const fetchMoviData=async (movieName)=>{

        setLoading(true)
        try{

            const movieResponse= await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=e33a7867&s="+encodeURIComponent(movieName));
            // const movieResponse= await fetch("/movies.json")
            const responseData = await  movieResponse.json();
            return responseData;

        }
        catch(err){

            conssole.log(err);
            return err;

        }

    }

    return (

        isLoading?
            <div className="loader" style={{position:'absolute'}}>
                <img src="/loader.gif"></img>
            </div>
        :
     
            
         <div className="row" style={{marginTop:'10%'}}>
                   
            <div className="card-deck">
            {movies.length ? movies.map(dataVal=>{

                 return( 
                    <div style={{cursor:'pointer'}} onClick={(e)=>{window.open(`/product/movies?imdbid=${dataVal.imdbID}`,"_blank")}}>
                    
                    <div className="col-sm" style={{marginTop:'20px'}}>

                        <div className="card cd_box_shadow" style={{width:'14rem',boxShadow:'5px 10px 18px #888888'}}>
                        <img className="card-img-top" src={dataVal.Poster} height="300" alt="Poster N/A"/>
                        <div className="card-body" style={{minHeight:'136px'}}>
                            <h5 className="card-title"> {dataVal.Title}</h5>
                        <div className="card-title">{dataVal.Year}</div>
                            
                        </div>
                        </div>
                        
                    </div>
                
                    </div>

                  )   


            })
            
            :
                <div style={{fontSize:'30px',color:'white'}} >{moviesErr}</div>
            }
            </div>
            

         
         
            <style jsx>{
                `
                .listing_div{
                    margin-top: 20%
                }
                `
            }
            </style>
            
        </div>
    )
}



