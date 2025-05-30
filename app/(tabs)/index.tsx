// app/(tabs)/index.tsx

// 1. Core React Native imports for building UI
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'; // Import React and useState Hook
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Removed Button, added TouchableOpacity
import { db } from '../../firebaseConfig'; // This path is correct now

export default function HomeScreen() {
  // 3. State variable for the YouTube URL input
  // 'youtubeUrl' will hold the current text in the input field.
  // 'setYoutubeUrl' is the function we call to update 'youtubeUrl'.
  // useState('') initializes 'youtubeUrl' as an empty string.
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [tagsInput, setTagsInput] = useState(''); // State to hold the tags input (e.g., "safe, kids, education")

    // Inside your HomeScreen component, after useState lines and before return (
  const handleAddUrl = async () => {
    // Basic validation: Check if URL is empty
    if (!youtubeUrl.trim()) { // .trim() removes whitespace, ensuring it's not just spaces
      Alert.alert('Error', 'YouTube URL cannot be empty.');
      return; // Stop the function if validation fails
    }

    // Process tags: Split the comma-separated string into a clean array of strings
    // .split(',') separates the string by commas
    // .map(tag => tag.trim().toLowerCase()) cleans whitespace and converts to lowercase
    // .filter(tag => tag.length > 0) removes any empty tags (e.g., from "tag1,,tag2")
    const tagsArray = tagsInput.split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);

    try {
      // Get a reference to the 'approved_urls' collection in your Firestore DB
      const urlsCollectionRef = collection(db, 'approved_urls');

      // Add a new document (record) to the 'approved_urls' collection
      const docRef = await addDoc(urlsCollectionRef, {
        url: youtubeUrl.trim(), // Save the trimmed URL
        tags: tagsArray, // Save the cleaned tags as an array
        createdAt: new Date(), // Add a timestamp for when the URL was added
      });

      // Log the new document ID to your Command Prompt/PowerShell for debugging
      console.log('Document written with ID: ', docRef.id);

      // Show a success message to the user
      Alert.alert('Success', 'YouTube URL added successfully!');

      // Clear the input fields after successful submission
      setYoutubeUrl('');
      setTagsInput('');

    } catch (e) {
      // If there's an error (e.g., permission denied, no internet), log it and show an alert
      console.error('Error adding document: ', e);
      Alert.alert('Error', 'Failed to add URL. Please try again. Check your terminal for details.');
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SafeWatch App</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.bodyText}>Add New YouTube URL:</Text>

        {/* 4. TextInput component for entering the URL */}
        <TextInput
          style={styles.input}
          placeholder="Enter YouTube URL"
          value={youtubeUrl} // This connects the input's displayed text to our 'youtubeUrl' state
          onChangeText={setYoutubeUrl} // This updates the 'youtubeUrl' state whenever the user types
          keyboardType="url" // Optimizes the keyboard for URL input
          autoCapitalize="none" // Prevents automatic capitalization of the first letter
          autoCorrect={false} // Disables auto-correction
        />
              {/* NEW: Input for Tags */}
        <TextInput
          style={styles.input}
          placeholder="Enter tags (comma-separated, e.g., safe, kids)"
          value={tagsInput}
          onChangeText={setTagsInput}
          autoCapitalize="none" // Tags are usually lowercase
          autoCorrect={false}
        />

     {/* NEW: Custom Button using TouchableOpacity */}
        <TouchableOpacity
          style={styles.button} // Apply button styling
          onPress={handleAddUrl}
          activeOpacity={0.7} // Makes the button slightly transparent when pressed
        >
          <Text style={styles.buttonText}>Add URL to SafeWatch</Text> {/* Text inside the button */}
        </TouchableOpacity>

        {/* Placeholder for the list of approved URLs that will appear later */}
        <View style={styles.urlListContainer}>
            <Text style={styles.bodyText}>Approved URLs will appear here:</Text>
            {/* This is where the list will go */}
        </View>
      </View>
    </SafeAreaView>
  );
}

// 6. Styles for our components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    padding: 15,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    color: '#333',
  },
  input: { // Style for the TextInput
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15, // Space below the input field
    backgroundColor: '#fff',
    fontSize: 16,
  },
  urlListContainer: { // Style for the container that will hold the list
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 20,
  },
  button: { // Style for the button's container
    backgroundColor: '#4CAF50', // Green background
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 25, // Horizontal padding
    borderRadius: 8, // Rounded corners
    marginBottom: 20, // Margin below the button
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: { // Style for the text inside the button
    color: '#fff', // White text color
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});