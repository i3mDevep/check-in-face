import {
  PDFViewer,
  Document,
  Page,
  Text,
  Font,
  View,
} from '@react-pdf/renderer';
import {
  Table,
  TableCell,
  DataTableCell,
  TableHeader,
  TableBody,
} from '@david.kucsai/react-pdf-table';
import { styles } from './styles-pdf';
import { useMemo } from 'react';

export interface PaymentWorker {
  day: string;
  hoursWorked: number;
  hoursWorkedBasic: number;
  hoursWorkedExtra: number;
  hoursNight: number;
  payment: {
    paymentHoursBasic: number;
    surcharges: {
      paymentHoursExtra: number;
      paymentHoursNight: number;
    };
  };
}

function formatCurrencyToCOP(value: number) {
  const options = {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  return value.toLocaleString('es-CO', options);
}

const getShortValue = (value: number) => value.toFixed(2);

export const PaymentWorkerPDF = ({
  data,
  paymentPeriod,
  fullName,
  identification,
}: {
  data: PaymentWorker[];
  paymentPeriod: string;
  fullName: string;
  identification: string;
}) => {
  const totalizer = useMemo(
    () =>
      data.reduce(
        (prev, curr) => {
          const {
            hoursWorked,
            payment: {
              paymentHoursBasic,
              surcharges: { paymentHoursExtra, paymentHoursNight },
            },
          } = curr;
          return {
            totalHours: prev.totalHours + hoursWorked,
            totalPayment:
              prev.totalPayment +
              paymentHoursBasic +
              paymentHoursExtra +
              paymentHoursNight,
          };
        },
        { totalHours: 0, totalPayment: 0 }
      ),
    [data]
  );

  return (
    <PDFViewer style={{ height: '100%' }}>
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            Payment - Cyrus Industries
          </Text>
          <View style={styles.summary}>
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

            <View style={styles.summaryContent}>
              <View style={styles.employeeInfoItem}>
                <Text style={styles.label}>Total hours worked:</Text>
                <Text style={styles.value}>
                  {totalizer.totalHours.toFixed(2)}
                </Text>
              </View>
              <View style={styles.employeeInfoItem}>
                <Text style={styles.label}>Total payment:</Text>
                <Text style={styles.value}>
                  {formatCurrencyToCOP(totalizer.totalPayment)}
                </Text>
              </View>
            </View>
          </View>

          <Table data={data}>
            <TableHeader fontSize="8px" textAlign={'center'}>
              <TableCell weighting={0.5}>day</TableCell>
              <TableCell>hours total</TableCell>
              <TableCell>hours basic</TableCell>
              <TableCell>hours extra</TableCell>
              <TableCell>hours night</TableCell>
              <TableCell>payment basic</TableCell>
              <TableCell>payment extra</TableCell>
              <TableCell>payment night</TableCell>
              <TableCell>payment total</TableCell>
            </TableHeader>
            <TableBody>
              <DataTableCell
                style={styles.cellTable}
                weighting={0.43}
                getContent={(r: PaymentWorker) => r.day}
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) => getShortValue(r.hoursWorked)}
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) =>
                  getShortValue(r.hoursWorkedBasic)
                }
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) =>
                  getShortValue(r.hoursWorkedExtra)
                }
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) => getShortValue(r.hoursNight)}
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) =>
                  formatCurrencyToCOP(r.payment.paymentHoursBasic)
                }
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) =>
                  formatCurrencyToCOP(r.payment.surcharges.paymentHoursExtra)
                }
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) =>
                  formatCurrencyToCOP(r.payment.surcharges.paymentHoursNight)
                }
              />
              <DataTableCell
                style={styles.cellTable}
                getContent={(r: PaymentWorker) =>
                  formatCurrencyToCOP(
                    r.payment.surcharges.paymentHoursNight +
                      r.payment.surcharges.paymentHoursExtra +
                      r.payment.paymentHoursBasic
                  )
                }
              />
            </TableBody>
          </Table>

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
};

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
});
