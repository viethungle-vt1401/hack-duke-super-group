import React, { useEffect, useState } from 'react';
import Map from '@/components/MapWrapper';
import SearchContainer from '@/components/SearchContainer';
import AddItemsIcon from '@/components/AddItemsIcon';

// Go Data Foundry!

export default function Home() {
  return (
    <div>
      <Map/>
      {/* <SearchContainer />
      <AddItemsIcon /> */}
    </div>
  )
}