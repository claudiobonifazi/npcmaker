import React from 'react';
import ReactDOM from 'react-dom';
import NpcMaker from './NpcMaker';
import 'fontsource-roboto';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <NpcMaker />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();
reportWebVitals(console.log);
