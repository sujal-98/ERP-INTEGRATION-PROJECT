import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// Register the Lora font
Font.register({
  family: 'Lora',
  fonts: [
    { src: `${process.env.PUBLIC_URL}/assets/Lora-Regular.ttf` },
    { src: `${process.env.PUBLIC_URL}/assets/Lora-Italic.ttf`, fontStyle: 'italic' },
    { src: `${process.env.PUBLIC_URL}/assets/Lora-Bold.ttf`, fontWeight: 700 },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding:30,
    fontSize: 12,
    fontFamily: 'Lora',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  logo: {
    marginLeft: 8,
    width: 50,
    height: 50,
  },
  collegeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    flexGrow: 0.5,
    alignSelf: 'center',
  },
  section: {
    position: 'relative',
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
  photo: {
    position: 'absolute',
    top: 55,
    right: 30,
    width: 80,
    height: 80,
    borderRadius: 40,
    zIndex: 2, 
  },
  infoContainer: {
    paddingRight: 100, 
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 1,
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
    width: '70%',
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
  student_name: 'N/A',
  batch: 'N/A',
  email: 'N/A',
  cgpa: 'N/A',
  college_name: 'N/A',
  semesters: [],
  achievements: {
    technical: [],
    nonTechnical: [],
  },
  societies: {
    technical: [],
    nonTechnical: [],
  },
  attendance: Array.from({ length: 8 }, (_, index) => ({
    semester: index + 1,
    theory: {
      totalClasses: 'N/A',
      attended: 'N/A',
    },
    practical: {
      totalClasses: 'N/A',
      attended: 'N/A',
    },
  })),
};
// Render PDF document
const StudentDataPDF = ({ studentData = defaultData }) => {
  const sortedSemesters = studentData.semesters.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));

  return (
    <Document>
      {/* Header for all pages */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/assets/bpitlogo.png`} />
          <Text style={styles.collegeName}>{studentData.college_name}</Text>
        </View>
        
        {/* Student Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <Image style={styles.photo} src={`${process.env.PUBLIC_URL}/assets/photo1.jpg`} />
          <View style={styles.infoContainer}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>Name</Text></View>
              <View style={styles.tableCol}><Text>{studentData.student_name}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>Email</Text></View>
              <View style={styles.tableCol}><Text>{studentData.email}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>Batch</Text></View>
              <View style={styles.tableCol}><Text>{studentData.batch}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>CGPA</Text></View>
              <View style={styles.tableCol}><Text>{studentData.cgpa}</Text></View>
            </View>
          </View>
        </View>
      </Page>

     {/* Attendance
     <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>
          <View style={styles.attendanceTableRow}>
            <View style={styles.attendanceColHeader}><Text>Semester</Text></View>
            <View style={styles.attendanceColHeader}><Text>Theory - Total Classes</Text></View>
            <View style={styles.attendanceColHeader}><Text>Theory - Attended</Text></View>
            <View style={styles.attendanceColHeader}><Text>Practical - Total Classes</Text></View>
            <View style={styles.attendanceColHeader}><Text>Practical - Attended</Text></View>
          </View>
          {studentData.attendance?.map((att, index) => (
            <View style={styles.attendanceTableRow} key={index}>
              <View style={styles.attendanceCol}><Text>{att.semester}</Text></View>
              <View style={styles.attendanceCol}><Text>{att.theory.totalClasses}</Text></View>
              <View style={styles.attendanceCol}><Text>{att.theory.attended}</Text></View>
              <View style={styles.attendanceCol}><Text>{att.practical.totalClasses}</Text></View>
              <View style={styles.attendanceCol}><Text>{att.practical.attended}</Text></View>
            </View>
          ))}
        </View> */}

      

      {/* Academic Records */}
      {sortedSemesters.map((semesterData, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/assets/bpitlogo.png`} />
            <Text style={styles.collegeName}>{studentData.college_name}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Academic Records - Semester {semesterData.semester}</Text>
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
        </Page>
      ))}


      {/* Achievements
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Technical Achievements</Text>
            <View style={styles.achievementList}>
              {studentData.achievements.technical.map((item, index) => (
                <Text key={index} style={styles.achievementItem}>- {item}</Text>
              ))}
            </View>
          </View>
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Non-Technical Achievements</Text>
            <View style={styles.achievementList}>
              {studentData.achievements.nonTechnical.map((item, index) => (
                <Text key={index} style={styles.achievementItem}>- {item}</Text>
              ))}
            </View>
          </View>
        </View> */}


       {/* Societies
       <View style={styles.section}>
          <Text style={styles.sectionTitle}>Societies</Text>
          <View style={styles.societiesSection}>
            <Text style={styles.sectionTitle}>Technical Societies</Text>
            <View style={styles.societiesList}>
              {studentData.societies.technical.map((item, index) => (
                <Text key={index} style={styles.societyItem}>- {item}</Text>
              ))}
            </View>
          </View>
          <View style={styles.societiesSection}>
            <Text style={styles.sectionTitle}>Non-Technical Societies</Text>
            <View style={styles.societiesList}>
              {studentData.societies.nonTechnical.map((item, index) => (
                <Text key={index} style={styles.societyItem}>- {item}</Text>
              ))}
            </View>
          </View>
        </View> */}

    </Document>
  );
};

// Functions to generate and download PDF
export const generatePdfUrl = async (studentData) => {
  const blob = await pdf(<StudentDataPDF studentData={studentData} />).toBlob();
  return URL.createObjectURL(blob);
};

export const downloadPdf = async (studentData) => {
  const blob = await pdf(<StudentDataPDF studentData={studentData} />).toBlob();
  saveAs(blob, `${studentData.student_name}_report.pdf`);
};

export const downloadAllPdf = async (studentData, returnBlob = false) => {
  const blob = await pdf(<StudentDataPDF studentData={studentData} />).toBlob();
  if (returnBlob) {
    return blob;
  } else {
    saveAs(blob, `${studentData.semesters[0].student_name}_report.pdf`);
  }
};

export default StudentDataPDF;
