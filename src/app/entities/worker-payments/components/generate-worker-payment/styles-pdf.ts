import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 'auto',
    left: 80,
    position: 'absolute'
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Oswald',
  },
  employeeInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  signatureRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50, 
    left: 35,  
    right: 35,  
  },
  signatureLabel: {
    fontSize: 10,
    color: '#222',
  },
  highlightedValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'green',
  },
  signatureLine: {
    width: '30%', 
    position: 'relative',
    bottom: -3,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  employeeInfoItem: {
    width: '30%',
  },
  label: {
    fontSize: 10,
    color: '#222',
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
  },
  summary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  summaryContent: {
    width: '48%',
  },
  sectionHeader: {
    fontSize: 16,
    fontFamily: 'Oswald',
    marginBottom: 10,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  hoursInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  table: {
    margin: 5,
  },
  cellTable: {
    textAlign: 'center',
    fontSize: 8,
    padding: 4,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});
