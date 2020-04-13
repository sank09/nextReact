import React from 'react'
import Listing from '../src/Components/Listing/Listing';
import { useRouter } from 'next/router';
import Layout from '../src/Components/Layout/Layout';
import {SearchMovies} from '../src/Components/SearchBar/SearchBar';

export default function productList() {

    const router = useRouter();

    const movieName=router.query.moviename;

    return (
        <div>
            <Layout>
           
                <Listing
                movieName={movieName}
                />
            </Layout>

        </div>
    )
}

