import SearchIcon from "@mui/icons-material/Search";
import {
  Autocomplete,
  CssVarsProvider,
  FormControl,
  FormLabel,
} from "@mui/joy";

export default function PlayerSearch() {
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
          options={[
            "Call of Duty",
            "Fortnite",
            "Overwatch",
            "Minecraft",
            "League of Legends",
          ]}
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
