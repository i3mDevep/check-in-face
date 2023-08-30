import {
  PDFViewer,
  Document,
  Page,
  Text,
  Font,
  View,
  Image,
} from '@react-pdf/renderer';
import {
  Table,
  TableCell,
  DataTableCell,
  TableHeader,
  TableBody,
} from '@david.kucsai/react-pdf-table';
import {
  Maybe,
  PaymentWorkerTime,
  PaymentWorkerTimeDetailsRegister,
} from 'src/api-graphql-types';

import { styles } from './styles-pdf';
import dayjs from 'dayjs';
import logoMor from '../../../../../assets/logo-mor.png';
import React from 'react';

function formatCurrencyToCOP(value: number) {
  const options = {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  return value.toLocaleString('es-CO', options);
}

const getShortValue = (value?: number | string | null) =>
  typeof value === 'number' ? value.toFixed(2) : Number(value).toFixed(2);

export const PaymentWorkerPDF = React.memo(({
  data,
  paymentPeriod,
  fullName,
  identification,
  paymentItems,
}: {
  data: Maybe<PaymentWorkerTime>;
  paymentPeriod: string;
  fullName: string;
  identification: string;
  paymentItems: Array<{ label: string; value: number; highlighted?: boolean }>;
}) => {
  return (
    <PDFViewer style={{ height: '100%' }}>
      <Document>
        <Page style={styles.body}>
          <View style={styles.headerContainer}>
            <Image style={styles.logo} src={logoMor} />
            <Text style={styles.headerTitle}>Payment - Cyrus Industries</Text>
          </View>
          <View style={styles.employeeInfo}>
            <View style={styles.employeeInfoItem}>
              <Text style={styles.label}>Name:</Text>
              <Text style={styles.value}>{fullName}</Text>
            </View>
            <View style={styles.employeeInfoItem}>
              <Text style={styles.label}>Identification:</Text>
              <Text style={styles.value}>{identification}</Text>
            </View>
            <View style={styles.employeeInfoItem}>
              <Text style={styles.label}>Payment period:</Text>
              <Text style={styles.value}>{paymentPeriod}</Text>
            </View>
          </View>
          <View style={styles.summary}>
            <View style={styles.summaryContent}>
              <Text style={styles.sectionHeader}>Payment details</Text>
              {paymentItems.map((item) => (
                <View style={styles.paymentInfo} key={item.label}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text
                    style={
                      item.highlighted ? styles.highlightedValue : styles.value
                    }
                  >
                    {formatCurrencyToCOP(item.value)}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.summaryContent}>
              <Text style={styles.sectionHeader}>Hours details</Text>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Worked Total:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursWorkedTotal)}
                </Text>
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Worked Basic:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursWorkedBasic)}
                </Text>
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Worked Basic Holiday:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursWorkedBasicHoliday)}
                </Text>
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Worked Extra Basic:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursWorkedExtraBasic)}
                </Text>
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Worked Extra Holiday:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursWorkedExtraHoliday)}
                </Text>
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Night Basic:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursNightBasic)}
                </Text>
              </View>
              <View style={styles.hoursInfo}>
                <Text style={styles.label}>Hours Night Holiday:</Text>
                <Text style={styles.value}>
                  {getShortValue(data?.totalizer?.hoursNightHoliday)}
                </Text>
              </View>
            </View>
          </View>
          {data?.details?.map((detail) => {
            return (
              <View style={styles.table} key={detail?.day}>
                <Table data={detail?.registers}>
                  <TableHeader fontSize="8px" textAlign={'center'}>
                    <TableCell weighting={0.5}>Day</TableCell>
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                  </TableHeader>
                  <TableBody>
                    <DataTableCell
                      style={styles.cellTable}
                      weighting={0.48}
                      getContent={() => detail?.day}
                    />
                    <DataTableCell
                      style={styles.cellTable}
                      getContent={(row: PaymentWorkerTimeDetailsRegister) =>
                        dayjs(row.start).format('MMMM D, YYYY h:mm A')
                      }
                    />
                    <DataTableCell
                      style={styles.cellTable}
                      getContent={(row: PaymentWorkerTimeDetailsRegister) =>
                        dayjs(row.end).format('MMMM D, YYYY h:mm A')
                      }
                    />
                  </TableBody>
                </Table>
              </View>
            );
          })}

          <View style={styles.signatureRow}>
            <Text style={styles.signatureLabel}>Employee Signature:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>Employer Signature:</Text>
            <View style={styles.signatureLine} />
          </View>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    </PDFViewer>
  );
});

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
