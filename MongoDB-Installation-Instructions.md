# MongoDB Community Edition Installation Guide for Windows

This guide provides step-by-step instructions to install and start MongoDB Community Edition on a Windows machine.

---

## Step 1: Download MongoDB Community Edition

1. Visit the official MongoDB Community Server download page:  
   https://www.mongodb.com/try/download/community

2. Select the following options:  
   - Version: Latest stable release  
   - Platform: Windows  
   - Package: MSI

3. Click **Download** to get the MSI installer.

---

## Step 2: Install MongoDB

1. Run the downloaded MSI installer.

2. Choose **Complete** installation.

3. Optionally, install MongoDB Compass (GUI for MongoDB).

4. Ensure the option to install MongoDB as a Windows service is checked.

5. Complete the installation.

---

## Step 3: Start MongoDB Service

1. Open **Services** app (search for "Services" in Start menu).

2. Find the service named **MongoDB**.

3. Right-click and select **Start**.

Alternatively, open an elevated Command Prompt and run:  
```
net start MongoDB
```

---

## Step 4: Verify MongoDB Installation

1. Open Command Prompt.

2. Run:  
```
mongod --version
```
to check MongoDB server version.

3. Run:  
```
mongosh
```
to open MongoDB shell and verify connection.

---

## Step 5: Restart Backend Server

After MongoDB is running, restart your backend server to connect successfully.

---

If you need assistance with any of these steps or prefer to use MongoDB Atlas cloud service instead, please let me know.
