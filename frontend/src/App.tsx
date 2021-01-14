import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';

const langs = {
  'pt-BR': 'Português',
  'en-US': 'English',
};

function getAppLang() : string {
  const lang = navigator.language || 'en-US';
  if (lang in langs) {
    return lang;
  }
  return 'en-US';
}

function App() : React.ReactElement {
  const [lang, setLang] = useState(getAppLang());
  const [roomInvite, setRoomInvite] = useState(undefined as string | undefined);
  const [roomCreator, setRoomCreator] = useState(true);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home
            lang={lang}
            setLang={setLang}
            langs={langs}
            setRoomInvite={setRoomInvite}
            roomInvite={roomInvite}
            setRoomCreator={setRoomCreator}
          />
        </Route>
        <Route path="/game" exact>
          <Game
            lang={lang}
            setLang={setLang}
            langs={langs}
            roomInvite={roomInvite}
            roomCreator={roomCreator}
          />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
