import { connect } from '@cerebral/react';
import React from 'react';

export const Select = connect(props => {
  const { id, disabled, name, label, onChange, value, values, error } = props;
  const ariaDisabled = props['aria-disabled'];
  const ariaDescribedby = props['aria-describedby'];

  const formatter = props['formatter'] || (v => v);
  const keys = props['keys'] || (v => v);

  return (
    <div className={'usa-form-group ' + (error ? 'usa-form-group--error' : '')}>
      <label htmlFor={id} className="usa-label">
        {label}
      </label>
      <select
        className={'usa-select ' + (error ? 'usa-select--error' : '')}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-label={name}
        aria-disabled={ariaDisabled}
        aria-describedby={ariaDescribedby}
      >
        <option value="">- Select -</option>
        {values.map(value => (
          <option key={keys(value)} value={keys(value)}>
            {formatter(value)}
          </option>
        ))}
      </select>
      {error && <div className="usa-error-message beneath">{error}</div>}
    </div>
  );
});
