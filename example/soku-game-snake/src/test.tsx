/* @refresh reload */

import { createRoot } from 'react-dom/client';
import { TestApp } from './TestApp';

const root = createRoot(document.getElementById('root')!);
root.render(<TestApp />);

