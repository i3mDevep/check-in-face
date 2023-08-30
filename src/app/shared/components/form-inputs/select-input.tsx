import { FormControl, InputLabel, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, values: readonly string[], theme: Theme) {
  return {
    fontWeight:
      values.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export interface ReactHookFormSelect {
  name: string;
  label: string;
  children?: React.ReactNode;
  control: any;
  defaultValue?: any;
}

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}: ReactHookFormSelect) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            labelId={labelId}
            label={label}
            onChange={onChange}
            value={value}
          >
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};

export function MultipleSelectChip(
  props: ReactHookFormSelect & { options: string[] }
) {
  const { label, control, name, defaultValue, options, ...rest } = props;
  const theme = useTheme();

  const labelId = `${name}-label`;

  return (
    <FormControl {...rest} sx={{ m: 1, width: 300 }}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            labelId={labelId}
            multiple
            value={value}
            onChange={onChange}
            input={<OutlinedInput label={label} />}
            renderValue={(selected: string[]) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value}  />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {options.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, value, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
}

export default ReactHookFormSelect;
