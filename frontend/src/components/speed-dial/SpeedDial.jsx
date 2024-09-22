import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import DownloadIcon from '@mui/icons-material/Download';
import { useSelector } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const actions = [
  { icon: <DownloadIcon />, name: 'Download All' },
];

const Speed = () => {
  const students = useSelector((state) => state.display.students);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cancel, setCancel] = useState(false);
  const workerRef = useRef(null);

  const handleDownloadAllClick = () => {
    setLoading(true);
    setProgress(0);
    setCancel(false);

    workerRef.current = new Worker(new URL('../../workers/download.js', import.meta.url));

    workerRef.current.onmessage = (e) => {
      const { type, progress, zipBlob } = e.data;

      if (type === 'progress') {
        setProgress(progress);
      } else if (type === 'done') {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(zipBlob);
        link.download = "students.zip";
        link.click();
        setLoading(false);
        workerRef.current.terminate();
      } else if (type === 'cancel') {
        setLoading(false);
        workerRef.current.terminate();
      }
    };

    workerRef.current.postMessage({ students, cancelToken: { cancelled: cancel } });
  };

  const handleCancelClick = () => {
    setCancel(true);
    if (workerRef.current) {
      workerRef.current.postMessage({ cancelToken: { cancelled: true } });
    }
  };

  return (
    <Box sx={{ height: 70, transform: 'translateZ(0px)', flexGrow: 1, position: 'sticky', bottom: '60px', left: '95%', width: '5%' }}>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '0%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
            backgroundColor: 'white', 
            borderRadius: '50px', 
            padding: '6px',
            marginRight: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
          }}
        >
          <CircularProgress variant="determinate" value={progress} size={60} thickness={4} />
          <Box sx={{ textAlign: 'center', mt: 2 }}>{`${Math.round(progress)}%`}</Box>
        </Box>
      ) : (
        <SpeedDial
          ariaLabel="SpeedDial basic example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleDownloadAllClick}
            />
          ))}
        </SpeedDial>
      )}
    </Box>
  );
};

export default Speed;
