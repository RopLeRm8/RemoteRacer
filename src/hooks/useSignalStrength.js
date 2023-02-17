import { DeviceUnknown } from '@mui/icons-material';
import SignalWifi1BarIcon from '@mui/icons-material/SignalWifi1Bar';
import SignalWifi2BarIcon from '@mui/icons-material/SignalWifi2Bar';
import SignalWifi3BarIcon from '@mui/icons-material/SignalWifi3Bar';
import SignalWifi4BarIcon from '@mui/icons-material/SignalWifi4Bar';

export default function useSignalStrength(signalStrength){
    switch (true) {
        case signalStrength <= -90:
          return <SignalWifi1BarIcon />;
        case signalStrength >= -89 && signalStrength <= -80:
          return <SignalWifi2BarIcon />;
        case signalStrength >= -79 && signalStrength <= -70:
          return <SignalWifi3BarIcon />;
        case signalStrength >= -69:
          return <SignalWifi4BarIcon />;
        default:
            return <DeviceUnknown/>
      }
    }
