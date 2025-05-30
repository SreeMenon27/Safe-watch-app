# SafeWatch App

### Project Overview

The **SafeWatch App** is a mobile application designed to provide a secure and curated environment for children to access online video content, primarily from YouTube. In an age where digital content consumption by children is prevalent, SafeWatch aims to give parents and guardians control over what their children can view, ensuring access only to pre-approved and vetted YouTube URLs.

This initial version focuses on the administrative backend functionality: allowing approved users to securely add and categorize YouTube links that will later be accessible to children.

### Current Features

* **Secure URL Submission:** Parents/administrators can securely add YouTube video URLs through a user-friendly interface.
* **Tagging System:** Each URL can be associated with relevant tags (e.g., "educational," "animals," "cartoons") for easy categorization and future filtering.
* **Cloud Storage with Firestore:** All approved URLs and their associated tags are stored securely in a dedicated Firebase Firestore database.

### Technologies Used

* **React Native (with Expo):** For cross-platform mobile application development.
* **Firebase Firestore:** A NoSQL cloud database used for storing approved YouTube URLs and their metadata.

### Getting Started (For Developers)

To set up and run the SafeWatch App locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/SreeMenon27/Safe-watch-app.git](https://github.com/SreeMenon27/Safe-watch-app.git)
    cd Safe-watch-app
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up Firebase Configuration:**
    * Create a `firebaseConfig.js` file at the root of your project.
    * Populate it with your Firebase project's web configuration details:
        ```javascript
        // firebaseConfig.js
        import { initializeApp } from 'firebase/app';
        import { getFirestore } from 'firebase/firestore';

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        export { db };
        ```
4.  **Configure Firestore Security Rules:**
    * In your Firebase Console, navigate to **Firestore Database -> Rules**.
    * Temporarily set the following rules for development (to allow `read` and `write` to `approved_urls`):
        ```firestore
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /approved_urls/{document=**} {
              allow read, write: if true;
            }
            match /{document=**} {
              allow read, write: if false;
            }
          }
        }
        ```
        **Remember to adjust these for production security!**
5.  **Start the app:**
    ```bash
    npx expo start --clear
    ```
    Scan the QR code with your Expo Go app on your mobile device.

### Usage (Adding Content)

Once the app is running:
1.  Enter a YouTube URL in the provided input field.
2.  Enter relevant tags, separated by commas (e.g., `education, science, fun`).
3.  Tap the "Add URL to SafeWatch" button.
4.  The URL and tags will be saved to your Firebase Firestore database. You can verify this in the "Data" tab of your Firestore Console.

### Next Steps & Future Enhancements

The immediate next steps for this project involve:
* **Displaying Approved URLs:** Creating a user interface to fetch and display the stored URLs in a scrollable list.
* **Clickable URLs:** Enabling children to click on a displayed URL and open it directly in a web browser or YouTube app.
* **Search and Filter:** Implementing functionality to search and filter URLs by tags or keywords.
* **User Authentication:** Implementing secure user authentication (parents/children) to control access to different app sections.