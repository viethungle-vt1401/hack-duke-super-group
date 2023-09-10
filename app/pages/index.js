import React, { useEffect, useState } from 'react';
//import MapComponent from '@/components/MapComponent';
import SearchContainer from '@/components/SearchContainer';
import UserSuggestMarker from '@/components/UserSuggestMarker';
import AddItemsIcon from '@/components/AddItemsIcon';
import Blueprint from '@/components/Blueprint';
import { useUser } from '@auth0/nextjs-auth0/client';
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
  const [showBlueprint, setShowBlueprint] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showMarker, setShowMarker] = useState(false);

  const {user, error, isLoading} = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  function handleBlueprintClose(){
    setShowBlueprint(false);
  }

  function handleAddPopupClose(){
    setShowAddPopup(false);
  }

  function handleAddPopupShow(){
    setShowAddPopup(true);
  }

  // if (isLoading) return <div>Loading...</div>
  // if (error) return <div>{error.message}</div>
  // if (user) {}''
  

  return (
    <div>
      <div className='log-in-container'>
        <a href="/api/auth/login">Login</a>
      </div>
      {isClient && <MapComponent />}
      {/*<UserSuggestMarker />*/}
      <SearchContainer />
      <AddItemsIcon handleAddPopupClose = {handleAddPopupClose} showAddPopup = {showAddPopup} handleAddPopupShow={handleAddPopupShow}/>
      <Blueprint handleBlueprintClose = {handleBlueprintClose} showBlueprint={showBlueprint} />
    </div>
  );
}