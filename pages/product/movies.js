import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect } from 'react';
import Rating from 'react-rating';


  const Blog = (props) => {
  
  const router = useRouter();	
  const { imdbid } = router.query;
  const [movieData,setMovieData]=React.useState({});
  const [moviesErr,setMovieErr]=React.useState('');
  const [isLoading,setLoading]=React.useState(true);

  console.log(imdbid)

  useEffect(()=>{


    const movieData= fetchMoviData(imdbid);   

    console.log(movieData)

    movieData.then(data=>{

      handleMovies(data);
    })
    .catch(err=>{

      handleMovies(0);
    })
  
  

  },[imdbid]);

  const handleMovies=(data)=>{

    console.log(data)
    if(! data ){
        console.log("dsdsds")
        setLoading(false)
        setMovieData([]);
        setMovieErr("Something went wrong")
        
    }else{

        if(data.Response=="False"){
            console.log("Fasle")
            setLoading(false)
            setMovieData([]);
            setMovieErr("Something went wrong");

        }
        else{
            console.log("True")
            setLoading(false)
            setMovieData(data);
            setMovieErr('');

          }
    
    
    }

  }


  const fetchMoviData=async (id)=>{

   const new_id=id;
   setLoading(true)
    try{
   

        const movieResponse= await fetch("https://www.omdbapi.com/?apikey=e33a7867&i="+new_id+"&plot=full");
        // const movieResponse= await fetch("/movies.json")
        const responseData = await  movieResponse.json();
        console.log(responseData)
        return responseData;

    }
    catch(err){

        conssole.log(err);
        return err;

    }

  }



  return (<div style={{height:'100vh'}}>
        <Head>
            <title>{movieData.Title}</title>
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>
          </Head>

          {  isLoading?
          <div style={{display:'flex',justifyContent:'center',height:'100vh',alignItems:'center'}}>
            <div className="loader">
                <img src="/loader.gif"></img>
            </div>
            </div>
          :
            <div className="container" style={{paddingTop:'5%'}}>

              {Object.keys(movieData).length ?

                  <div className="row">
                  <div className="col-sm-3">
                    <div class="card" style={{width:'18rem',minHeight:'136px'}}>
                      <img class="card-img-top" src={movieData.Poster} style={{boxShadow:'5px 10px 18px #888888'}}
                      alt="Poster N/A"/>
      
                    </div>
                  </div>
                  <div className="col-sm-9" style={{paddingLeft:'5%',color:'white'}}> 
                       <h5 className="card-title" style={{fontSize:'30px'}}>{movieData.Title}</h5>
                       <div className="overall-font">{movieData.Genre}</div>
                       <div className="overall-font">{movieData.Released} | {movieData.Runtime}</div>

                       <div className="overall-font"><span className="fontBold">Country</span>  : {movieData.Country} </div>
                       <div className="overall-font"><span className="fontBold">Language</span>  : {movieData.Language} </div>
                     
                       <div className="overall-font"><span className="fontBold">Director</span>  : {movieData.Director} </div>
                       <div className="overall-font"><span className="fontBold">Actors</span> : {movieData.Actors} </div>
                       <div className="overall-font"><span className="fontBold">Imdb Rating</span> : {movieData.imdbRating}</div>
                       <div>
                       <Rating
                            placeholderRating={movieData.imdbRating}
                            emptySymbol={<img src="/empty.png" height='30' />}
                            placeholderSymbol={<img src="/filled.png" height='30'  />}
                            fullSymbol={<img src="/filled.png" height='30' />}
                            readonly={true}
                            stop={10}
                          />
                       </div>
                       <div className="overall-font"><span className="fontBold">Plot</span> : {movieData.Plot} </div>
                      

                  </div>

                  </div>
              
            
              :
               null
              }
            

            </div>

          }

          <style jsx>
            {
              `
              .overall-font{
                font-size:20px
              },
              .fontBold{
                font-weight:bold;
              },
              body{
                background:black;
              }
              `
            }
          </style>
         
        </div>)
  }

  export default Blog