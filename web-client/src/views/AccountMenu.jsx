import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import PropTypes from 'prop-types';
import React from 'react';

export const AccountMenuItems = ({ signOut }) => {
  return (
    <ul className="usa-unstyled-list">
      <li>
        <a
          className="account-menu-item"
          href="/"
          onClick={() => {
            signOut();
          }}
        >
          Log Out
        </a>
      </li>
    </ul>
  );
};

export const AccountMenu = connect(
  {
    isMenuOpen: state.accountMenuHelper.isMenuOpen,
    signOutSequence: sequences.signOutSequence,
    toggleAccountMenu: sequences.toggleAccountMenuSequence,
    user: state.user,
  },
  ({ isMenuOpen, toggleAccountMenu, user }) => {
    return (
      <div className={isMenuOpen ? 'account-menu open' : 'account-menu closed'}>
        <div className="account-button-container">
          <button
            title={`Hello, ${user.name}`}
            type="button"
            className="button-account-menu"
            aria-label="account menu"
            onClick={() => toggleAccountMenu()}
          >
            <FontAwesomeIcon
              icon={['fa', 'user']}
              className="account-menu-icon"
            />
            <FontAwesomeIcon
              icon={['fa', 'caret-down']}
              className="account-menu-icon caret"
            />
          </button>
        </div>
        {isMenuOpen && <AccountMenuContent />}
      </div>
    );
  },
);

class AccountMenuContentComponent extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const targetClasses = Array.from(e.target.classList);
    if (targetClasses.indexOf('account-menu-item') > -1) {
      return true;
    } else {
      // set a small delay to account for state updates in parent
      setTimeout(this.props.closeAccountMenu, 200);
    }
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick);
  }

  render() {
    return (
      <div className="account-menu-content">
        {AccountMenuItems({ signOut: this.props.signOutSequence })}
      </div>
    );
  }
}

AccountMenuContentComponent.propTypes = {
  closeAccountMenu: PropTypes.func,
  signOutSequence: PropTypes.func.isRequired,
};

AccountMenuItems.propTypes = {
  signOut: PropTypes.func,
};

const AccountMenuContent = connect(
  {
    closeAccountMenu: sequences.closeAccountMenuSequence,
    signOutSequence: sequences.signOutSequence,
  },
  AccountMenuContentComponent,
);
