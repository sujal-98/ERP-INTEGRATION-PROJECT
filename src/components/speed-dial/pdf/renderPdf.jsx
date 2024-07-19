import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  collegeName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '20%',
    backgroundColor: '#f0f0f0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCol: {
    width: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: {
    textAlign: 'center',
  },
});

// Default data
const defaultData = {
  name: 'N/A',
  batch: 'N/A',
  email: 'N/A',
  academicRecords: [],
  achievements: {
    academic: ['N/A'],
    nonAcademic: ['N/A'],
  },
  attendance: 'N/A',
  cgpa: 'N/A',
  projects: ['N/A'],
  experience: ['N/A'],
};

// Render PDF document
const StudentDataPDF = ({ studentData }) => {
  // Sort semesters in ascending order
  const sortedSemesters = studentData.semesters.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src="https://via.placeholder.com/50" />
          <Text style={styles.collegeName}>{studentData.college_name}</Text>
        </View>

        {/* Student Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text>Name</Text></View>
            <View style={styles.tableCol}><Text>{studentData.student_name}</Text></View>
            <View style={styles.tableColHeader}><Text>Batch</Text></View>
            <View style={styles.tableCol}><Text>{studentData.batch}</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text>Email</Text></View>
            <View style={styles.tableCol}><Text>{studentData.email}</Text></View>
            <View style={styles.tableColHeader}><Text>CGPA</Text></View>
            <View style={styles.tableCol}><Text>{studentData.cgpa}</Text></View>
          </View>
        </View>

        {/* Academic Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Academic Records</Text>
          {sortedSemesters.map((semesterData, index) => (
            <View key={index}>
              <Text style={styles.sectionTitle}>Semester {semesterData.semester}</Text>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}><Text>Subject</Text></View>
                <View style={styles.tableColHeader}><Text>Credits</Text></View>
                <View style={styles.tableColHeader}><Text>Internal Marks</Text></View>
                <View style={styles.tableColHeader}><Text>External Marks</Text></View>
                <View style={styles.tableColHeader}><Text>Total</Text></View>
              </View>
              {Object.keys(semesterData)
                .filter(key => key.startsWith('subjectname'))
                .map(key => {
                  const subjectIndex = key.replace('subjectname', '');
                  if (
                    semesterData[key] ||
                    semesterData[`obtainedcredit${subjectIndex}`] ||
                    semesterData[`internalmark${subjectIndex}`] ||
                    semesterData[`externalmark${subjectIndex}`] ||
                    semesterData[`total${subjectIndex}`]
                  ) {
                    return (
                      <View style={styles.tableRow} key={key}>
                        <View style={styles.tableCol}><Text>{semesterData[key]}</Text></View>
                        <View style={styles.tableCol}><Text>{semesterData[`obtainedcredit${subjectIndex}`]}</Text></View>
                        <View style={styles.tableCol}><Text>{semesterData[`internalmark${subjectIndex}`]}</Text></View>
                        <View style={styles.tableCol}><Text>{semesterData[`externalmark${subjectIndex}`]}</Text></View>
                        <View style={styles.tableCol}><Text>{semesterData[`total${subjectIndex}`]}</Text></View>
                      </View>
                    );
                  }
                  return null;
                })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export const generatePdfUrl = async (studentData) => {
  const blob = await pdf(<StudentDataPDF studentData={studentData} />).toBlob();
  return URL.createObjectURL(blob);
};

export const downloadPdf = async (studentData) => {
  const blob = await pdf(<StudentDataPDF studentData={studentData} />).toBlob();
  saveAs(blob, `${studentData.student_name}_report.pdf`);
};

export default StudentDataPDF;
