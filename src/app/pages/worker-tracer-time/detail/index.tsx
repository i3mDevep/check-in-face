import { useMemo, useState } from 'react';

import * as XLSX from 'xlsx';

import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TableViewIcon from '@mui/icons-material/TableView';
import Tab from '@mui/material/Tab';

import TimelapseIcon from '@mui/icons-material/Timelapse';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

import { WorkerTracerTimeTableView } from './worker-tracer-time-table-view';
import { WorkerTracerTimeCalendarView } from './worker-tracer-time-calendar-view';

import { GetListWorkerMarkTime_getListWorkerMarkTime } from 'src/graphql/queries/__generated__/GetListWorkerMarkTime';
import { useCalculateIntervalsWithDate } from 'src/app/entities/worker-timeline/hooks/useCalculateIntervalsWithDate';

import { CardAnalytics } from 'src/app/shared/components/card-analytics';
import { ModalCreateTimestamp } from 'src/app/entities/worker-timeline/components/create-manual-timestamp';
import { WorkerCardInfo } from 'src/app/entities/worker/components/worker-card-info';

export const WorkerTracerTimeDetail = () => {
  const [resultQueryMark, setResultQueryMark] = useState<
    GetListWorkerMarkTime_getListWorkerMarkTime[] | undefined
  >();
  const { intervals } = useCalculateIntervalsWithDate(resultQueryMark ?? []);

  const [value, setValue] = useState('1');
  const { identification } = useParams();

  const getSumOfMinutesTotal = useMemo(() => {
    return intervals.reduce((acc, entry) => acc + entry.minutes, 0);
  }, [intervals]);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleDownload = () => {
    const rows = intervals.map((interval) => ({
      identification,
      timeIn: interval.start,
      timeEnd: interval.end,
      timeWorked: interval.minutes,
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    XLSX.utils.book_append_sheet(workbook, worksheet, 'TimeMarkedWorker');

    XLSX.utils.sheet_add_aoa(worksheet, [
      [
        'Identification',
        'Time in (Date)',
        'Time out (Date)',
        'Time worked (minutes)',
      ],
    ]);

    XLSX.writeFile(workbook, `${identification}-report.xlsx`, {
      compression: true,
    });
  };

  if (!identification) return;

  return (
    <TabContext value={value}>
      <Stack direction="row">
        {value === '1' && (
          <>
            <WorkerCardInfo identification={identification} />
            <CardAnalytics
              icon={<TimelapseIcon />}
              title="Hours worked"
              value={((getSumOfMinutesTotal ?? 1) / 60).toFixed(2)}
            />
            <CardAnalytics
              icon={<DownloadForOfflineIcon />}
              title="Download data"
              onClickButton={handleDownload}
            />
          </>
        )}
        <ModalCreateTimestamp identification={identification} />
        <TabList
          sx={{
            '& .MuiTabs-flexContainer': { justifyContent: 'right' },
            '& .MuiTabs-scroller': { height: 'fit-content' },
            marginLeft: 'auto',
          }}
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
      </Stack>
      <TabPanel value="1" sx={{ height: '100%', padding: 0 }}>
        <WorkerTracerTimeTableView onResultMarkTime={setResultQueryMark} />
      </TabPanel>
      <TabPanel value="2" sx={{ height: '100%', padding: 0 }}>
        <WorkerTracerTimeCalendarView />
      </TabPanel>
    </TabContext>
  );
};
