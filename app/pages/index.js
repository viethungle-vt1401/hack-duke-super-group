import React, { useEffect, useState } from 'react';
//import MapComponent from '@/components/MapComponent';
import SearchContainer from '@/components/SearchContainer';
import AddItemsIcon from '@/components/AddItemsIcon';
import Blueprint from '@/components/Blueprint';
import { Auth0Provider } from "@auth0/auth0-react";
import 'leaflet/dist/leaflet.css' // fixing tiles

import dynamic from 'next/dynamic';

const MapComponent = dynamic(
  () => import('@/components/MapComponent'),
  {
    ssr: false,
    loading: () => (<div>loading...</div>),
  }
);

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Auth0Provider
      domain= {process.env.REACT_APP_AUTH0_DOMAIN}
      clientId= {process.env.REACT_APP_CLIENT_ID}
      // redirectUri={window.location.origin}
    >
      <div>
        {isClient && <MapComponent />}
        <SearchContainer />
        <AddItemsIcon />
        {/*<Blueprint />*/}
      </div>
    </Auth0Provider>
  );
}