import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames';
import './nav.scss';

/**
 * Component: Nav
 * Handle navigation
 * @param {[tab]} tabs
 * @param {string} currentTab
 */
export default function Nav({ tabs, currentTab }) {
  return (
    <nav className="nav">
      <ul className="uk-tab uk-flex-center">
        {tabs.map((tab, i) => (
          <li
            className={className({
              'uk-active': tab.key === currentTab,
            })}
            key={i}
          >
            <Link to={`/${tab.key}`}>{tab.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
