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
    padding: 30,
    fontSize: 12,
    fontFamily: 'Lora',
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingBottom: 2,
  },
  logo: {
    marginLeft: 20,
    width: 50,
    height: 50,
  },
  collegeName: {
    fontSize: 16,
    paddingRight: 5,
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
    break: 'page',
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
    paddingRight: 60,
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
  attendanceSection: {
    marginBottom: 20,
  },
  
  attendanceColHeader: {
    width: '80%',
    backgroundColor: '#f0f0f0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 10,
    marginRight:1,
    marginBottom:10
  },
  attendanceCol: {
    width: '40%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 10,
    marginRight:15,
    marginBottom:10
  },
  achievementRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  achievementColHeader: {
    width: '50%',
    backgroundColor: '#f0f0f0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
    textAlign: 'center',
    fontWeight: 'bold'
    
  },
  achievementCol: {
    width: '50%',
    borderStyle: 'solid',
    padding:5,
    borderWidth: 1,
    
  },
  societiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  societiesColHeader: {
    width: '25%',
    backgroundColor: '#f0f0f0',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  societiesCol: {
    width: '25%',
    borderStyle: 'solid',
    padding: 10,
    borderWidth: 1,
    textAlign: 'center',
  },
  sectionSpacing: {
    marginBottom: 50, 
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
  societies: [],
  attendance: [
    { theory_attendance_semester_1: 'N/A', practical_attendance_semester_1: 'N/A' },
    { theory_attendance_semester_2: 'N/A', practical_attendance_semester_2: 'N/A' },
    { theory_attendance_semester_3: 'N/A', practical_attendance_semester_3: 'N/A' },
    { theory_attendance_semester_4: 'N/A', practical_attendance_semester_4: 'N/A' },
  ],
};

// Render PDF document
const StudentDataPDF = ({ studentData = defaultData }) => {
  // Sort semesters
  const sortedSemesters = studentData.semesters.sort((a, b) => parseInt(a.semester) - parseInt(b.semester));

  const attendanceData = [
    {
      enrollment_number: studentData.enrollment_number || 'N/A',
      student_name: studentData.student_name || 'N/A',
      theory_attendance_semester_1: studentData.attendance[0]?.theory?.attended || 'N/A',
      practical_attendance_semester_1: studentData.attendance[0]?.practical?.attended || 'N/A',
      theory_attendance_semester_2: studentData.attendance[1]?.theory?.attended || 'N/A',
      practical_attendance_semester_2: studentData.attendance[1]?.practical?.attended || 'N/A',
      theory_attendance_semester_3: studentData.attendance[2]?.theory?.attended || 'N/A',
      practical_attendance_semester_3: studentData.attendance[2]?.practical?.attended || 'N/A',
      theory_attendance_semester_4: studentData.attendance[3]?.theory?.attended || 'N/A',
      practical_attendance_semester_4: studentData.attendance[3]?.practical?.attended || 'N/A',
    },
  ]
  const societies = studentData.societies || [];

  return (
    <Document>
      {/* Single Page with both Student Information and Attendance */}
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/assets/bpitlogo.png`} />
          <Text style={styles.collegeName}>{studentData.semesters[0].college_name}</Text>
        </View>

        {/* Student Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Student Information</Text>
          <Image style={styles.photo} src={`${process.env.PUBLIC_URL}/assets/photo1.jpg`} />
          <View style={styles.infoContainer}>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>Name</Text></View>
              <View style={styles.tableCol}><Text>{studentData.semesters[0].student_name}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>Email</Text></View>
              <View style={styles.tableCol}><Text>{studentData.email}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>Batch</Text></View>
              <View style={styles.tableCol}><Text>{studentData.semesters[0].batch}</Text></View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}><Text>CGPA</Text></View>
              <View style={styles.tableCol}><Text>{studentData.overall_cgpa}</Text></View>
            </View>
          </View>
        </View>

    {/* Attendance */}
    <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>
          <View style={styles.infoContainer}>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 1</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_1|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 1</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_1|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 2</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_2|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 2</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_2|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 3</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_3|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 3</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_3|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 4</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_4|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 4</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_4|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 5</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_5|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 5</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_5|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 6</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_6|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 6</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_6|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 7</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_7|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 7</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_7|| 'N/A'}</Text></View>
          </View>
          <View style={styles.tableRow}><View style={styles.attendanceColHeader}><Text>Theory - Sem 8</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].theory_attendance_semester_8|| 'N/A'}</Text></View>
          <View style={styles.attendanceColHeader}><Text>Practical - Sem 8</Text></View>
          <View style={styles.attendanceCol}><Text>{studentData.attendance[0].practical_attendance_semester_8|| 'N/A'}</Text></View>
          </View>
            
          
        
        </View>
        </View>
      </Page>

      {/* Academic Records */}
      {sortedSemesters.map((semesterData, index) => (
        <Page key={index} size="A4" style={styles.page}>
          <View style={styles.header}>
            <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/assets/bpitlogo.png`} />
            <Text style={styles.collegeName}>{semesterData.college_name}</Text>
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

      {/* Achievements */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={`${process.env.PUBLIC_URL}/assets/bpitlogo.png`} />
          <Text style={styles.collegeName}>{studentData.semesters[0].college_name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementRow}>
            <View style={styles.achievementColHeader}><Text>Achievement</Text></View>
            <View style={styles.achievementColHeader}><Text>Description</Text></View>
         
          </View>
          {studentData.achievements.map((achievement, index) => (
            <View style={styles.achievementRow} key={index}>
              <View style={styles.achievementCol}><Text>{achievement.achievement}</Text></View>
              <View style={styles.achievementCol}><Text>{achievement.achievement_description}</Text></View>
  
            </View>
          ))}
        </View>
      
         {/* Societies Section */}
         <View style={styles.section}>
  <Text style={styles.sectionTitle}>Societies</Text>
  <Text style={styles.sectionTitle}>Technical Societies</Text>
  {societies.filter(society => society.background === 'Technical').map((society, index) => (
    <View key={index} style={styles.societiesRow}>
      <View style={styles.societiesColHeader}><Text>Society Name</Text></View>
      <View style={styles.societiesColHeader}><Text>Position</Text></View>
      <View style={styles.societiesColHeader}><Text>Major Events</Text></View>
      <View style={styles.societiesColHeader}><Text>Achievements</Text></View>
      
      <View style={styles.societiesCol}><Text>{society.name}</Text></View>
      <View style={styles.societiesCol}><Text>{society.position}</Text></View>
      <View style={[styles.societiesCol, { flexWrap: 'wrap' }]}>
        {society.major_events.map((event, eventIndex) => (
          <Text key={eventIndex}>{event}</Text>
        ))}
      </View>
      <View style={[styles.societiesCol, { flexWrap: 'wrap' }]}>
        {society.achievements.map((ach, achIndex) => (
          <Text key={achIndex}>{ach}</Text>
        ))}
      </View>
    </View>
  ))}

<View style={styles.sectionSpacing} />
  <Text style={styles.sectionTitle}>Non-Technical Societies</Text>
  {societies.filter(society => society.background === 'Non-Technical').map((society, index) => (
    <View key={index} style={styles.societiesRow}>
      <View style={styles.societiesColHeader}><Text>Society Name</Text></View>
      <View style={styles.societiesColHeader}><Text>Position</Text></View>
      <View style={styles.societiesColHeader}><Text>Major Events</Text></View>
      <View style={styles.societiesColHeader}><Text>Achievements</Text></View>

      <View style={styles.societiesCol}><Text>{society.name}</Text></View>
      <View style={styles.societiesCol}><Text>{society.position}</Text></View>
      <View style={[styles.societiesCol, { flexWrap: 'wrap' }]}>
        {society.major_events.map((event, eventIndex) => (
          <Text key={eventIndex}>{event}</Text>
        ))}
      </View>
      <View style={[styles.societiesCol, { flexWrap: 'wrap' }]}>
        {society.achievements.map((ach, achIndex) => (
          <Text key={achIndex}>{ach}</Text>
        ))}
      </View>
    </View>
  ))}
</View>

      </Page>
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
  saveAs(blob, `${studentData.semesters[0].student_name}_report.pdf`);
};

export const downloadAllPdf = async (studentData, returnBlob = false) => {
  try {
    const blob = await pdf(<StudentDataPDF studentData={studentData} />).toBlob();
    
    if (returnBlob) {
      return blob;
    } else {
      saveAs(blob, `${studentData.semesters[0].student_name}_report.pdf`);
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

export default StudentDataPDF;
