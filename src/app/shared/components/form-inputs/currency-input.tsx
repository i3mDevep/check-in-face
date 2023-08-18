import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import {
  NumericFormat,
  NumberFormatValues,
} from 'react-number-format';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './form-input-props';

export const CurrencyInput = React.forwardRef(
  ({ onChange, value, ...rest }: Omit<TextFieldProps, 'onChange' | 'value'> & any, ref) => {
    const [currency, setCurrency] = React.useState(value);

    React.useEffect(() => {
      setCurrency(value);
    }, [value]);

    const handleOnValueChange = (
      values: NumberFormatValues,
    ) => {
      onChange(values.floatValue);
      setCurrency(values.floatValue);
    };

    return (
      <NumericFormat
        customInput={TextField}
        thousandSeparator={true}
        prefix={'$ '}
        value={currency}
        onValueChange={handleOnValueChange}
        inputRef={ref}
        {...rest}
      />
    );
  }
);

export const FormInputCurrency = ({
  name,
  control,
  label,
  textFieldProps,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <CurrencyInput onChange={onChange} value={value} error={error} label={label} {...textFieldProps} />
      )}
    />
  );
};
