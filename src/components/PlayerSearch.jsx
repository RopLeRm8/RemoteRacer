import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  Avatar,
  Button,
  CircularProgress,
  CssVarsProvider,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/joy";
import { useEffect } from "react";
import useGetOptions from "../hooks/useGetOptions";

export default function PlayerSearch() {
  const { usersData, loading } = useGetOptions();
  useEffect(() => {
    console.log(usersData);
  }, [usersData]);
  return (
    <>
      <CssVarsProvider />
      <FormControl>
        <FormLabel sx={{ fontFamily: "Inter" }}></FormLabel>
        <Autocomplete
          startDecorator={<SearchIcon />}
          color="warning"
          placeholder="Search players"
          blurOnSelect
          clearOnEscape
          selectOnFocus
          loading={loading}
          disabled={loading}
          endDecorator={
            loading ? <CircularProgress size="sm" color="warning" /> : null
          }
          options={usersData.map((user) => ({
            label: user.name ? user.name : "[No Name]",
            value: user,
            img: user.photoURL ? user.photoURL : "Remy Sharp",
          }))}
          renderOption={(props, option) => (
            <Button
              variant="outlined"
              color="warning"
              sx={{
                my: 0.3,
                mx: 1,
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Typography {...props} key={option.id}>
                {option.img && (
                  <Avatar
                    src={option.img}
                    sx={{
                      width: "24px",
                      height: "24px",
                      mr: "10px",
                    }}
                  />
                )}
                {option.label}
              </Typography>
            </Button>
          )}
          noOptionsText="No players found"
          slotProps={{
            listbox: {
              sx: {
                maxHeight: "200px",
                position: "relative",
                zIndex: 1850,
              },
            },
          }}
        />
      </FormControl>
    </>
  );
}
