import { Alert, Avatar, Box, Stack } from '@mui/material';

export const PreviewImage = ({
  prevImage,
  onClose,
}: {
  prevImage: string | null | undefined;
  onClose: () => void
}) => {
  return (
    prevImage && (
      <Stack>
        <Stack direction="row">
          <Alert severity="warning" onClose={onClose}>
            Are you sure, you want to save this image ?
          </Alert>
          <Box>
            <Avatar
              variant="square"
              sx={{ width: 56, height: 56 }}
              src={prevImage}
              alt="prev"
            />
          </Box>
        </Stack>
      </Stack>
    )
  );
};
