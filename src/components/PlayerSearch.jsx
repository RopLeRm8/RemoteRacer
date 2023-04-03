import { getAuth } from "@firebase/auth";
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
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import useGetOptions from "../hooks/useGetOptions";
import UserInformationModal from "./UserInformationModal";

export default function PlayerSearch() {
  const { usersData, loading } = useGetOptions();
  const [userSelected, setUserSelected] = useState(null);
  const [user] = useAuthState(getAuth());
  const playerSearchRef = useRef();
  const handleChange = (_, nVal) => {
    setUserSelected(nVal?.value);
    playerSearchRef?.current?.getInstance?.()?.hideMenu?.();
  };
  const optionValueIsEqual = (option, value) => {
    return option.value.uid === value.value.uid;
  };

  return (
    <>
      <UserInformationModal
        userSelected={userSelected}
        setUserSelected={setUserSelected}
      />
      <CssVarsProvider />
      <FormControl>
        <FormLabel sx={{ fontFamily: "Inter" }}></FormLabel>
        <Autocomplete
          ref={playerSearchRef}
          startDecorator={<SearchIcon />}
          onChange={handleChange}
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
          isOptionEqualToValue={optionValueIsEqual}
          renderOption={(props, option) => (
            <Button
              variant="outlined"
              color="warning"
              sx={{
                my: 0.3,
                mx: 1,
                display: option.value.uid !== user.uid ? "flex" : "none",
                justifyContent: "space-around",
              }}
            >
              <Typography {...props} key={option?.value?.uid}>
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
