import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchBox } from './SearchBox';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import close from '../../node_modules/uswds/dist/img/close.svg';
import seal from '../images/ustc_seal.svg';

import { AccountMenu, AccountMenuItems } from './AccountMenu';

const NavigationItems = helper => {
  return (
    <ul className="usa-nav__primary usa-unstyled-list">
      {helper.showMessages && (
        <li className="usa-nav__primary-item">
          <a href="/">Messages</a>
        </li>
      )}
      {helper.showDocumentQC && (
        <li className="usa-nav__primary-item">
          <a href="/">Document QC</a>
        </li>
      )}
      {helper.showMyCases && (
        <li className="usa-nav__primary-item">
          <a href="/">My Cases</a>
        </li>
      )}
    </ul>
  );
};

export const Header = connect(
  {
    betaBar: state.betaBar,
    helper: state.headerHelper,
    loginSequence: sequences.gotoLoginSequence,
    mobileMenu: state.mobileMenu,
    signOutSequence: sequences.signOutSequence,
    toggleBetaBarSequence: sequences.toggleBetaBarSequence,
    toggleMobileMenuSequence: sequences.toggleMobileMenuSequence,
    user: state.user,
  },
  ({
    betaBar,
    helper,
    loginSequence,
    mobileMenu,
    signOutSequence,
    toggleBetaBarSequence,
    toggleMobileMenuSequence,
    user,
  }) => {
    return (
      <>
        {betaBar.isVisible && (
          <div className="beta">
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-col-10">
                  This is a testing site for the U.S. Tax Court and not intended
                  public use. To learn more about starting a case, visit the{' '}
                  <a href="https://www.ustaxcourt.gov/">
                    U.S. Tax Court website
                  </a>
                  .
                </div>
                <div className="grid-col-2">
                  <button
                    className="usa-button usa-button__outline usa-button__unstyled"
                    onClick={() => toggleBetaBarSequence()}
                  >
                    <img src={close} alt="close" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <header
          className="usa-header usa-header-extended grid-container"
          role="banner"
        >
          <div className="usa-navbar">
            <div className="usa-logo" id="extended-logo">
              <a href="/">
                <img src={seal} alt="USTC Seal" />
              </a>
            </div>
            <button
              className="usa-menu-btn"
              onClick={() => toggleMobileMenuSequence()}
            >
              Menu
            </button>
          </div>

          <nav
            role="navigation"
            className={
              mobileMenu.isVisible
                ? 'usa-nav mobile-menu is-visible'
                : 'usa-nav'
            }
          >
            <div className="usa-nav-inner">
              <button
                className="usa-nav-close"
                onClick={() => toggleMobileMenuSequence()}
              >
                Close{' '}
                <FontAwesomeIcon
                  icon={['fa', 'times-circle']}
                  className="account-menu-icon"
                />
              </button>
              <div className="usa-nav-primary">{NavigationItems(helper)}</div>
              {user && (
                <div className="usa-nav-secondary">
                  <ul className="usa-unstyled-list usa-nav-secondary-links">
                    {helper.showSearchInHeader && (
                      <li role="search" className="usa-search">
                        <SearchBox />
                      </li>
                    )}
                    {user.userId && (
                      <li className="user-dropdown">
                        <AccountMenu />
                      </li>
                    )}
                  </ul>
                  {mobileMenu.isVisible && user.userId && (
                    <AccountMenuItems signOut={signOutSequence} />
                  )}
                </div>
              )}
              {!user && (
                <div className="usa-nav-secondary">
                  <ul className="usa-unstyled-list usa-nav-secondary-links">
                    <li>
                      <button
                        title="Login"
                        type="button"
                        className="button-account-login"
                        aria-label="login"
                        onClick={() => loginSequence()}
                      >
                        <FontAwesomeIcon
                          icon={['fa', 'user']}
                          className="account-menu-icon"
                        />{' '}
                        Log In
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </nav>
        </header>
      </>
    );
  },
);
