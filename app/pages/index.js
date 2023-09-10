import React, { useEffect, useState } from 'react';
import SearchContainer from '@/components/SearchContainer';
import UserSuggestPopup from '@/components/UserSuggestPopup';
import AddItemsIcon from '@/components/AddItemsIcon';
import Blueprint from '@/components/Blueprint';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link'
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
  const [userIsAdding, setUserIsAdding] = useState(false);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [showSuggestPopup, setShowSuggestPopup] = useState(false);

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
    setUserIsAdding(true);
    setShowSuggestPopup(true);
  }

  function userDetails(){
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>{error.message}</div>;
    return !user ?         
        <div>
          <Link href='/api/auth/login'><button className='log-nav'>Login</button></Link>
        </div>
        :
        <div>
          <Link href="/api/auth/logout"><button className='log-nav'>Logout</button></Link>
          <div>
            <h2>Welcome {user.name}!</h2>
            <p>{user.email}</p>
          </div>
        </div>
    }

    function handleCloseSuggestPopup(){
      setShowSuggestPopup(false);
      setUserIsAdding(false);
    }
  

  return (
    <div>
      <div className='log-in-container'>
        {userDetails()}
      </div>
      {isClient && 
      <MapComponent 
        userIsAdding = {userIsAdding} 
        closeUserIsAdding = {() => setUserIsAdding(false)}
        clickedPosition = {clickedPosition}
        setClickedPosition = {(a) => setClickedPosition(a)}
      />
      }
      {/*<UserSuggestMarker />*/}
      <SearchContainer />
      <AddItemsIcon handleAddPopupClose = {handleAddPopupClose} showAddPopup = {showAddPopup} handleAddPopupShow={handleAddPopupShow}/>
      <Blueprint handleBlueprintClose = {handleBlueprintClose} showBlueprint={showBlueprint} />
      {showSuggestPopup && <UserSuggestPopup clickedPosition = {clickedPosition} closeSelf = {handleCloseSuggestPopup()}/>}
    </div>
  );
}