import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import '../styles/Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGamepad, faPlus, faUsers, faAngleRight, faAngleLeft, faCopy,
} from '@fortawesome/free-solid-svg-icons';
import FadeIn from 'react-fade-in';
import ReactTooltip from 'react-tooltip';
import copy from 'copy-to-clipboard';
import socket from '../services/SocketIO';
import { getLang } from '../utils/Lang';
import LangSwitcher from '../components/LangSwitcher';
import API from '../services/API';
import logo from '../assets/logo.svg';

interface HomeProps {
  lang: string;
  setLang: Function;
  langs: any;
  setRoomInvite: Function;
  roomInvite: string | undefined;
  setRoomCreator: Function;
}

let apiCalled = false;

export default function Home(props: HomeProps) : React.ReactElement {
  const {
    lang, setLang, langs, setRoomInvite, roomInvite, setRoomCreator,
  } = props;
  const [playAction, setPlayAction] = useState(0);
  const [createdInvite, setCreatedInvite] = useState('');
  const [usedInvite, setUsedInvite] = useState('');
  const locale = getLang(lang);

  useEffect(() => {
    socket.on('used', setRoomInvite);
  }, [setRoomInvite]);

  if (roomInvite) {
    return <Redirect to="/game/" />;
  }

  const createNewGame = () => {
    if (createdInvite !== '' || apiCalled) return;
    apiCalled = true;
    API.post('/games/').then((res) => {
      setCreatedInvite(res.data.invite);
      socket.emit('ownership', res.data.invite);
    });
  };

  const joinRoom = () => {
    if (usedInvite === createdInvite || usedInvite === '') return;
    socket.emit('join', usedInvite);
    setRoomInvite(usedInvite);
    setRoomCreator(false);
  };

  const getPlayContainer = () => {
    if (playAction === 1) {
      return (
        <FadeIn>
          <h2>
            <button type="button" className="action-button" onClick={() => setPlayAction(0)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            {' '}
            {locale.home.join.title}
          </h2>
          <h3>{locale.home.join.label}</h3>
          <div className="input-group">
            <input type="text" className="text-input" onChange={(e) => setUsedInvite(e.target.value)} />
            <button type="button" className="action-button input-icon" onClick={joinRoom}>
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </FadeIn>
      );
    } if (playAction === 2) {
      if (createdInvite === '') {
        createNewGame();
        return <h2>{locale.home.create.wait}</h2>;
      }
      return (
        <FadeIn>
          <h2>
            <button type="button" className="action-button" onClick={() => setPlayAction(0)}>
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            {' '}
            {locale.home.create.title}
          </h2>
          <h3>{locale.home.create.label}</h3>
          <div className="input-group">
            <input type="text" className="text-input" readOnly value={createdInvite} />
            <button type="button" className="action-button input-icon" data-tip data-for="clipboard" data-event="click">
              <FontAwesomeIcon icon={faCopy} />
            </button>
            <ReactTooltip
              id="clipboard"
              place="bottom"
              effect="solid"
              delayHide={2000}
              afterShow={() => {
                copy(createdInvite);
                ReactTooltip.hide();
              }}
            >
              {locale.home.create.copied}
            </ReactTooltip>
          </div>
        </FadeIn>
      );
    }
    return (
      <>
        <h2>
          <FontAwesomeIcon icon={faGamepad} />
          {' '}
          {locale.home.main.play}
        </h2>
        <button type="button" className="action-button" onClick={() => setPlayAction(1)}>
          <FontAwesomeIcon icon={faUsers} />
          {' '}
          {locale.home.main.join}
          {' '}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
        <button type="button" className="action-button" onClick={() => setPlayAction(2)}>
          <FontAwesomeIcon icon={faPlus} />
          {' '}
          {locale.home.main.create}
          {' '}
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </>
    );
  };

  return (
    <>
      <LangSwitcher lang={lang} setLang={setLang} langs={langs} />
      <div id="main-container">
        <div id="game-content">
          <header id="header-container" className="centered-container">
            <h1 className="page-heading">{locale.game_title}</h1>
            <img src={logo} alt="Tic Tac Toe Logo" />
          </header>
          <div id="game-options-container" className="centered-container">
            {getPlayContainer()}
          </div>
        </div>
      </div>
    </>
  );
}
