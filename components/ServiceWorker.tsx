'use client';
import {useEffect} from 'react';
export default function ServiceWorker(){
 useEffect(()=>{
  if(!('serviceWorker' in navigator))return;
  if(process.env.NODE_ENV!=='production'){
   navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister())));
   if('caches' in window)caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('bepc-ci-')).map(k=>caches.delete(k))));
   return;
  }
  navigator.serviceWorker.register('/sw.js',{updateViaCache:'none'}).then(r=>r.update()).catch(()=>{});
 },[]);
 return null;
}