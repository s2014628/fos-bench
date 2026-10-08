import {createRoot} from 'react-dom/client';
import Observatory from './app/observatory';
import bootstrap from './public/data/bootstrap.json';
import './app/globals.css';
const query=new URLSearchParams(window.location.search);
createRoot(document.getElementById('root')!).render(<Observatory initial={bootstrap} initialView={query.get('view')||'live'} initialBenchmark={query.get('bench')||'GSM8K'}/>);
