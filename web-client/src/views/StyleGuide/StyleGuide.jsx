import React from 'react';

import { Buttons } from './Buttons';
import { Cards } from './Cards';
import { Forms } from './Forms';
import { SelectMulti } from './SelectMulti';
import { Tables } from './Tables';
import { TabsSection as Tabs } from './Tabs';
import { Typography } from './Typography';

export const StyleGuide = () => (
  <React.Fragment>
    <section className="usa-section usa-grid">
      <div
        style={{
          border: '1px solid black',
          height: '400px',
          overflowY: 'scroll',
          width: '400px',
        }}
      >
        {[
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
          'Sixth',
          'Do you have what it takes to make the top of my backlog? If so, tell me what you did on your last date, what you’ll do on your next and any impediments to dating you.',
          'If I said you have a beautiful backlog, would you hold it against me? I only work with teams that let me talk during the daily scrum. A lot.',
          'No, you can’t do any refactoring',
          'My backlog is as well-groomed as I am.',
        ].map((doc, index) => (
          <div key={index}>
            <input type="radio" id={index} value={doc} name="test" />
            <label htmlFor={index}>{doc}</label>
          </div>
        ))}
      </div>
    </section>
    <Typography />
    <Buttons />
    <Tables />
    <Forms />
    <SelectMulti />
    <Cards />
    <Tabs />
  </React.Fragment>
);
