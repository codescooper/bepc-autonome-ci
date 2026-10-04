import './globals.css';
import ServiceWorker from '../components/ServiceWorker';
export const metadata={title:'BEPC Autonome CI',description:'Préparation autonome au BEPC ivoirien',manifest:'/manifest.webmanifest',themeColor:'#173d2b'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="fr"><body>{children}<ServiceWorker/></body></html>}
