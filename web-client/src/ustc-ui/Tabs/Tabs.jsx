import React, { useState } from 'react';
import { connect } from '@cerebral/react';
import { getDefaultAttribute, map } from '../utils/ElementChildren';
import classNames from 'classnames';
import { camelCase } from 'lodash';
import { decorateWithPostCallback } from '../utils/useCerebralState';
import { sequences, state, props } from 'cerebral';
import PropTypes from 'prop-types';
import { useCerebralStateFactory } from '../utils/useCerebralState';

export function Tab() {}

export function TabsComponent({
  bind,
  value,
  simpleSetter,
  onSelect,
  children,
  defaultActiveTab,
}) {
  let activeKey, setTab;

  defaultActiveTab =
    defaultActiveTab || getDefaultAttribute(children, 'tabName');

  if (bind) {
    const useCerebralState = useCerebralStateFactory(simpleSetter, value);
    [activeKey, setTab] = useCerebralState(bind, defaultActiveTab);
  } else {
    [activeKey, setTab] = useState(defaultActiveTab);
  }

  setTab = decorateWithPostCallback(setTab, onSelect);

  function renderTab(child) {
    const { title, tabName, id } = child.props;

    const isActiveTab = tabName === activeKey;
    const tabContentId = `tabContent-${camelCase(tabName)}`;

    var liClass = classNames({
      active: isActiveTab,
    });

    return (
      <li className={liClass}>
        <button
          role="tab"
          className="tab-link"
          id={id}
          aria-controls={tabContentId}
          aria-selected={isActiveTab}
          onClick={() => setTab(tabName)}
        >
          {title}
        </button>
      </li>
    );
  }

  function renderTabContent(child) {
    const { children, tabName } = child.props;
    const isActiveTab = tabName === activeKey;
    const tabContentId = `tabContent-${camelCase(tabName)}`;

    if (isActiveTab) {
      return (
        <div role="tabpanel" id={tabContentId}>
          {children}
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <nav className="horizontal-tabs subsection">
        <ul role="tablist">{map(children, renderTab)}</ul>
      </nav>

      {map(children, renderTabContent)}
    </>
  );
}

TabsComponent.propTypes = {
  bind: PropTypes.string,
  value: PropTypes.any,
  simpleSetter: PropTypes.string,
  onSelect: PropTypes.func,
  children: PropTypes.node,
  defaultActiveTab: PropTypes.string,
};

export const Tabs = connect(
  {
    bind: props.bind,
    value: state[props.bind],
    simpleSetter: sequences.cerebralBindSimpleSetStateSequence,
  },
  TabsComponent,
);
