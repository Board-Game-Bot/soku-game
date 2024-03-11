/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
// import { App } from './App';

const root = document.getElementById('root');

import 'virtual:uno.css';
import { App2 } from './App2';

render(() => <App2 />, root!);
