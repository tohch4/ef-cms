import { Text } from '../../ustc-ui/Text/Text';
import { connect } from '@cerebral/react';
import { props, sequences, state } from 'cerebral';
import React from 'react';

export const CaseTypeSelect = connect(
  {
    allowDefaultOption: props.allowDefaultOption,
    caseTypes: props.caseTypes,
    legend: props.legend,
    onChange: sequences[props.onChange],
    validation: sequences[props.validation],
    validationErrors: state.validationErrors,
    value: props.value,
  },
  ({
    allowDefaultOption,
    caseTypes,
    legend,
    onChange,
    validation,
    validationErrors,
    value,
  }) => {
    return (
      <div className="subsection">
        <div
          className={
            'usa-form-group case-type-select ' +
            (validationErrors.caseType ? 'usa-form-group--error' : '')
          }
        >
          <fieldset className="usa-fieldset">
            <legend className="usa-legend">{legend}</legend>
            <select
              name="caseType"
              id="case-type"
              aria-labelledby="case-type"
              value={value}
              className="usa-select"
              onChange={e => {
                onChange({
                  key: e.target.name,
                  value: e.target.value,
                });
                validation();
              }}
            >
              {allowDefaultOption && <option value="">-- Select --</option>}
              {caseTypes.map(caseType => (
                <option
                  key={caseType.type || caseType}
                  value={caseType.type || caseType}
                >
                  {caseType.description || caseType}
                </option>
              ))}
            </select>
          </fieldset>
          <Text
            className="usa-error-message"
            bind="validationErrors.caseType"
          />
        </div>
      </div>
    );
  },
);
