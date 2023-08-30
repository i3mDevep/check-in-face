import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald',
  },
  summary: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald',
  },
  table: {
    margin: 5
  },
  cellTable: {
    textAlign: 'center',
    fontSize: 8,
    padding: 4
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
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
  employeeInfo: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  summaryContent: {
    marginBottom: 20,
  },
  employeeInfoItem: {
    display: 'flex',
    flexDirection: 'row',
  },
  label: {
    fontSize: 10,
    color: '#222',
    marginTop: 2,
  },
  value: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 2,
    marginLeft: 5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    borderTop: '1px solid #EEE',
    paddingTop: 8,
    paddingBottom: 8,
  },
});
