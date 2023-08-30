import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PreviewIcon from '@mui/icons-material/Preview';
import { Button, Stack, Typography, TextField } from '@mui/material';
import { DialogBase } from 'src/app/shared/components/dialog-base';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormInputCurrency } from 'src/app/shared/components/form-inputs/currency-input';

export const ModalSettingsPDF = ({
  paymentItems,
  onUpdatePaymentItem,
}: {
  paymentItems: Array<{
    id: string;
    label: string;
    value: number;
    canDelete?: boolean;
    highlighted?: boolean;
  }>;
  onUpdatePaymentItem: (
    data: {
      label: string;
      value: number;
      highlighted?: boolean | undefined;
      id: string;
    }[]
  ) => void;
}) => {
  const [openModalSettings, setOpenModalSettings] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFields, setNewFields] = useState<typeof paymentItems>([]);

  const {
    handleSubmit,
    control,
    setValue,
    unregister,
    formState: { isDirty },
  } = useForm<Record<string, number>>({
    defaultValues: paymentItems.reduce(
      (prev, curr) => ({ ...prev, [curr.id]: curr.value }),
      {}
    ),
  });

  const onSubmit: SubmitHandler<Record<string, number>> = async (data) => {
    onUpdatePaymentItem([
      ...Object.entries(data).flatMap(([id, value]) => {
        const oldPayment = [...paymentItems, ...newFields].find(
          (payment) => payment.id === id
        );
        if (!oldPayment) return [];

        if (id === 'payment_total')
          return {
            id,
            value: Object.entries(data).reduce(
              (prev, [id, value]) =>
                id === 'payment_total' ? prev : prev + Number(value),
              0
            ),
            label: oldPayment.label,
            highlighted: oldPayment.highlighted,
          };

        return {
          id,
          value: Number(value),
          label: oldPayment.label,
          highlighted: oldPayment.highlighted,
          canDelete: oldPayment?.canDelete,
        };
      }),
    ]);
    setNewFields([]);
    handleClose();
  };

  const handleAddField = () => {
    const newFieldId = newFieldLabel.toLowerCase().replace(/ /g, '_');

    const newField = {
      id: newFieldId,
      label: newFieldLabel,
      canDelete: true,
      value: 0,
    };

    setNewFields((prev) => [...prev, newField]);
    setValue(newFieldId, 0);
    setNewFieldLabel('');
  };

  const handleClose = () => {
    setOpenModalSettings(false);
  };
  // const handleDeleteField = (fieldId: string) => {
  //   setNewFields((prev) => prev.filter((field) => field.id !== fieldId));
  // };
  return (
    <>
      <IconButton
        onClick={() => setOpenModalSettings(true)}
        sx={{
          position: 'fixed',
          zIndex: 3,
          right: 10,
          color: 'white',
          top: 20,
        }}
      >
        <PreviewIcon />
      </IconButton>
      <DialogBase
        dialogProps={{
          open: openModalSettings,
          onClose: handleClose,
          maxWidth: 'sm',
          fullWidth: true,
        }}
      >
        <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
          Edit Payment Items
        </Typography>
        <Stack
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          gap={20}
          maxWidth={500}
        >
          {[...paymentItems, ...newFields].map((item, index) => (
            <FormInputCurrency
              key={item.id}
              label={item.label}
              name={item.id}
              control={control}
              textFieldProps={{
                disabled: index === 0,
                required: true,
                sx: { margin: 5 },
              }}
            />
          ))}
          <TextField
            label="New Field Label"
            variant="outlined"
            value={newFieldLabel}
            onChange={(e) => setNewFieldLabel(e.target.value)}
            sx={{ margin: 1 }}
          />
          <Button
            variant="contained"
            onClick={handleAddField}
            sx={{ marginTop: 2 }}
            disabled={!newFieldLabel}
          >
            Add Field
          </Button>
          <Button
            disabled={!isDirty}
            variant="contained"
            type="submit"
            sx={{ marginTop: 2 }}
          >
            Save
          </Button>
        </Stack>
      </DialogBase>
    </>
  );
};
