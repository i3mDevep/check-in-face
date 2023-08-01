import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TableViewIcon from '@mui/icons-material/TableView';
import Tab from '@mui/material/Tab';

import { WorkerTracerTimeTableView } from './worker-tracer-time-table-view';
import { WorkerTracerTimeCalendarView } from './worker-tracer-time-calendar-view';
import { useParams } from 'react-router-dom';

export const WorkerTracerTimeDetail = () => {
  const [value, setValue] = useState('1');
  const { identification } = useParams();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  if (!identification) return;

  return (
    <TabContext value={value}>
      <TabList
        sx={{ '& .MuiTabs-flexContainer': { justifyContent: 'right' } }}
        value={value}
        onChange={handleChange}
      >
        <Tab
          sx={{ '&.MuiTab-root': { minWidth: 10 } }}
          icon={<TableViewIcon fontSize="small" />}
          value="1"
          arial-aria-label="table-view"
        />
        <Tab
          sx={{ '&.MuiTab-root': { minWidth: 10 } }}
          icon={<CalendarTodayIcon fontSize="small" />}
          value="2"
          aria-label="calendar-view"
        />
      </TabList>

      <TabPanel  value="1" sx={{ height: '100%', padding: 0 }}>
        <WorkerTracerTimeTableView />
      </TabPanel>
      <TabPanel value="2" sx={{ height: '100%', padding: 0 }}>
        <WorkerTracerTimeCalendarView />
      </TabPanel>
    </TabContext>
  );
};
