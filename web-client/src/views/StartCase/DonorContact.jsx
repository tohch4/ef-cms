import { connect } from '@cerebral/react';
import { sequences, state } from 'cerebral';
import React from 'react';
import Address from './Address';
import Email from './Email';

export default connect(
  {
    form: state.form,
    updateFormValueSequence: sequences.updateFormValueSequence,
  },
  function DonorContact({ form, updateFormValueSequence }) {
    return (
      <div className="usa-form-group contact-group">
        <h3>Tell Us About the Donor You Are Filing For</h3>
        <div className="blue-container">
          <div className="usa-form-group">
            <label htmlFor="name">Name of Petitioner</label>
            <input
              id="name"
              type="text"
              name="contactPrimary.name"
              autoCapitalize="none"
              value={form.contactPrimary.name || ''}
              onChange={e => {
                updateFormValueSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
              }}
            />
          </div>
          <Address type="contactPrimary" />
          <Email />
          <div className="usa-form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="contactPrimary.phone"
              className="ustc-input-phone"
              autoCapitalize="none"
              value={form.contactPrimary.phone || ''}
              onChange={e => {
                updateFormValueSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
    );
  },
);