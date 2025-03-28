import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { colors, titles, btn1 } from '../globals/style';

const CsvUpload = ({ navigation, route }) => {
  const { email } = route.params; // Get email from route params
  const [file, setFile] = useState(null);
  const [customError, setCustomError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Function to handle file selection
  const pickFile = async () => {
    try {
      if (Platform.OS === 'web') {
        // Web: Use an input element to select the file
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.csv';
        fileInput.onchange = (e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            setFile({
              uri: URL.createObjectURL(selectedFile),
              name: selectedFile.name,
              type: selectedFile.type,
            });
            setCustomError('');
          }
        };
        fileInput.click();
      } else {
        // Android/iOS: Use expo-document-picker
        const result = await DocumentPicker.getDocumentAsync({
          type: 'text/csv',
          copyToCacheDirectory: false, // Avoid unnecessary file duplication
        });

        if (result.canceled) {
          setCustomError('File selection canceled.');
          return;
        }

        const selectedFile = result.assets[0]; // Extract file from assets
        if (!selectedFile) {
          setCustomError('Failed to retrieve file.');
          return;
        }

        setFile({
          uri: selectedFile.uri,
          name: selectedFile.name,
          type: selectedFile.mimeType,
        });
        setCustomError('');
      }
    } catch (error) {
      console.error('Error picking file:', error);
      setCustomError('Failed to pick the file.');
    }
  };

  // Function to handle file upload
  const handleFileUpload = async () => {
    if (!file) {
      setCustomError('Please select a CSV file.');
      return;
    }

    // Create FormData object
    const formData = new FormData();
    if (Platform.OS === 'web') {
      // Web: Use fetch with File object
      const fileBlob = await fetch(file.uri).then((res) => res.blob());
      formData.append('file', fileBlob, file.name);
    } else {
      // Android/iOS: Use the file URI
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: file.type || 'text/csv',
      });
    }
    formData.append('email', email);

    try {
      const response = await fetch('http://127.0.0.1:8000/drinks/upload-csv/', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          // Do not set 'Content-Type' manually for FormData
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMsg('CSV file uploaded successfully!');
        setCustomError('');
      } else {
        if (data.error === 'CSV file already exists') {
          Alert.alert(
            'CSV File Exists',
            'A CSV file already exists for this store. Do you want to replace it?',
            [
              { text: 'Cancel', style: 'cancel' },
              {
                text: 'Replace',
                onPress: async () => {
                  const replaceResponse = await fetch('http://127.0.0.1:8000/drinks/replace-csv/', {
                    method: 'POST',
                    body: formData,
                    headers: {
                      'Accept': 'application/json',
                    },
                  });
                  const replaceData = await replaceResponse.json();
                  if (replaceResponse.ok) {
                    setSuccessMsg('CSV file replaced successfully!');
                  } else {
                    setCustomError(replaceData.error || 'Failed to replace CSV file.');
                  }
                },
              },
            ],
          );
        } else {
          setCustomError(data.error || 'Failed to upload CSV file.');
        }
      }
    } catch (error) {
      setCustomError('An error occurred while uploading the file.');
      console.error('Upload error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head1}>Upload CSV File</Text>
      {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>}
      {successMsg !== '' && <Text style={styles.successmsgtxt}>{successMsg}</Text>}

      <TouchableOpacity style={btn1} onPress={pickFile}>
        <Text style={styles.btnText}>Select CSV File</Text>
      </TouchableOpacity>

      {file && (
        <Text style={styles.fileName}>Selected File: {file.name}</Text>
      )}

      <TouchableOpacity style={btn1} onPress={handleFileUpload}>
        <Text style={styles.btnText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  head1: {
    fontSize: titles.title1,
    color: colors.text1,
    textAlign: 'center',
    marginVertical: 10,
  },
  errormsg: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  successmsgtxt: {
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  fileName: {
    fontSize: 16,
    color: colors.text1,
    marginVertical: 10,
  },
  btnText: {
    color: colors.col1,
    fontSize: titles.btntxt,
    fontWeight: 'bold',
  },
});

export default CsvUpload;