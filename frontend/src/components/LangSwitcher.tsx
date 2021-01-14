import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import '../styles/LangSwitcher.scss';

interface LangSwitcherProps {
  lang: string;
  setLang: Function;
  langs: any;
}

export default function LangSwitcher(props: LangSwitcherProps) : React.ReactElement {
  const { lang, setLang, langs } = props;
  const [collapsed, setCollapsed] = useState(true);

  const getLangOptions = () => {
    const options = [];

    // eslint-disable-next-line no-restricted-syntax
    for (const key in langs) {
      if (lang === key) {
        options.push(<option value={key} key={key}>{langs[key]}</option>);
      } else {
        options.push(<option value={key} key={key}>{langs[key]}</option>);
      }
    }

    return options;
  };

  const handleChange = (e: any) => {
    setLang(e.target.value);
    setCollapsed(true);
  };

  return (
    <div id="lang-switcher-container">
      <button type="button" className="action-button" id="lang-switcher" onClick={() => setCollapsed(!collapsed)}>
        <FontAwesomeIcon icon={faLanguage} />
      </button>
      <select defaultValue={lang} id="lang-options" className={collapsed ? 'hidden' : ''} onChange={handleChange}>
        {getLangOptions()}
      </select>
    </div>
  );
}
