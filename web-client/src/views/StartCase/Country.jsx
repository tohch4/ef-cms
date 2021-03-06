import { Text } from '../../ustc-ui/Text/Text';
import { connect } from '@cerebral/react';
import { props, sequences, state } from 'cerebral';
import React from 'react';

export const Country = connect(
  {
    constants: state.constants,
    data: state[props.bind],
    type: props.type,
    updateFormValueSequence: sequences[props.onChange],
    validateStartCaseSequence: sequences[props.onBlur],
    validationErrors: state.validationErrors,
  },
  ({
    data,
    constants,
    type,
    updateFormValueSequence,
    validateStartCaseSequence,
    validationErrors,
  }) => {
    return (
      <React.Fragment>
        <div
          className={
            'usa-form-group ' +
            (validationErrors &&
            validationErrors[type] &&
            validationErrors[type].countryType
              ? 'usa-form-group--error'
              : '')
          }
        >
          <label htmlFor={`${type}.countryType`} className="usa-label">
            Country
          </label>
          <select
            className={`${type}-country-type usa-select`}
            id={`${type}.countryType`}
            name={`${type}.countryType`}
            value={data[type].countryType}
            onChange={e => {
              updateFormValueSequence({
                key: e.target.name,
                value: e.target.value,
              });
              validateStartCaseSequence();
            }}
          >
            <option value={constants.COUNTRY_TYPES.DOMESTIC}>
              - United States -
            </option>
            <option value={constants.COUNTRY_TYPES.INTERNATIONAL}>
              - International -
            </option>
          </select>
          <Text
            className="usa-error-message"
            bind={`validationErrors.${type}.countryType`}
          />
        </div>
        {data[type].countryType === constants.COUNTRY_TYPES.INTERNATIONAL && (
          <div
            className={
              'usa-form-group ' +
              (validationErrors &&
              validationErrors[type] &&
              validationErrors[type].country
                ? 'usa-form-group--error'
                : '')
            }
          >
            <label htmlFor={`${type}.country`} className="usa-label">
              Country Name
            </label>
            <input
              id={`${type}.country`}
              type="text"
              className={`${type}-country usa-input`}
              name={`${type}.country`}
              autoCapitalize="none"
              value={data[type].country || ''}
              onChange={e => {
                updateFormValueSequence({
                  key: e.target.name,
                  value: e.target.value,
                });
              }}
              onBlur={() => {
                validateStartCaseSequence();
              }}
            />
            <Text
              className="usa-error-message"
              bind={`validationErrors.${type}.country`}
            />
          </div>
        )}
      </React.Fragment>
    );
  },
);
