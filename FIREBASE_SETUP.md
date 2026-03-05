# 🔥 Firebase Setup Guide — VogueThread Admin Panel

এই guide টা follow করলে তুমি **5টা সহজ ধাপে** Admin Panel চালু করতে পারবে।

---

## ধাপ ১ — Firebase Account খোলো

1. **https://firebase.google.com** এ যাও
2. **"Get Started"** বা **"Go to Console"** চাপো
3. তোমার Google Account দিয়ে login করো (Gmail থাকলেই হবে)

---

## ধাপ ২ — নতুন Project বানাও

1. Firebase Console এ **"Add project"** চাপো
2. Project name দাও: `voguethread-store`
3. Google Analytics: **"Enable"** রাখো (বা disable করতে পারো)
4. **"Create project"** চাপো — কিছুক্ষণ অপেক্ষা করো
5. **"Continue"** চাপো

---

## ধাপ ৩ — Web App যোগ করো ও Config Copy করো

1. Project dashboard এ **`</>`** (Web) icon এ চাপো
2. App nickname: `voguethread-web`
3. **"Register app"** চাপো
4. একটা code block দেখাবে — এটা তোমার **Config**। এরকম দেখাবে:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "voguethread-store.firebaseapp.com",
  projectId: "voguethread-store",
  storageBucket: "voguethread-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

5. এই পুরো config টা **copy** করো
6. তোমার project এর **`js/firebase-config.js`** ফাইল খোলো
7. ওখানে যে `firebaseConfig = { ... }` আছে সেটা মুছে নতুনটা **paste** করো

---

## ধাপ ৪ — Database ও Storage চালু করো

### Firestore Database (Products store হবে এখানে):
1. Left sidebar এ **"Firestore Database"** চাপো
2. **"Create database"** চাপো
3. **"Start in test mode"** select করো ✅
4. Location: **`asia-south1`** (Bangladesh এর কাছের) বা যেকোনো
5. **"Enable"** চাপো

### Storage (ছবি store হবে এখানে):
1. Left sidebar এ **"Storage"** চাপো
2. **"Get started"** চাপো
3. **"Start in test mode"** select করো ✅
4. **"Done"** চাপো

---

## ধাপ ৫ — Admin Account বানাও

1. Left sidebar এ **"Authentication"** চাপো
2. **"Get started"** চাপো
3. **"Email/Password"** এ click করো
4. **"Enable"** toggle ON করো → **"Save"**
5. **"Users"** tab এ যাও → **"Add user"** চাপো
6. তোমার email ও একটা strong password দাও
7. **"Add user"** চাপো

> ⚠️ এই email ও password দিয়েই তুমি admin.html এ login করবে।
> এটা customer রা জানবে না।

---

## ✅ এখন Admin Panel ব্যবহার করো!

1. তোমার website এ যাও: `https://YOUR_USERNAME.github.io/clothing-website/`
2. **`admin.html`** এ যাও: `https://YOUR_USERNAME.github.io/clothing-website/admin.html`
3. তোমার Firebase email ও password দিয়ে **login** করো
4. **"Add Product"** চাপো → ছবি upload করো, details দাও, Save করো
5. Customer রা **homepage ও shop** এ নতুন product দেখতে পাবে! 🎉

---

## 🔒 Security — Important!

Admin panel টা secure রাখতে:

1. Firebase Console → Firestore → **Rules** tab এ যাও
2. এই rules paste করো:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      // Anyone can READ (customers)
      allow read: if true;
      // Only logged-in admin can WRITE
      allow write: if request.auth != null;
    }
  }
}
```

3. **"Publish"** চাপো

Storage rules এর জন্য → Storage → Rules:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 📋 Summary — কোন ফাইল কী করে

| ফাইল | কাজ |
|---|---|
| `admin.html` | তোমার Admin Dashboard (শুধু তুমি দেখবে) |
| `js/firebase-config.js` | Firebase connection details |
| `js/firebase-products.js` | Firebase থেকে products load করে |
| `js/products.js` | Backup local data (Firebase না থাকলে দেখাবে) |

---

## ❓ সমস্যা হলে

| সমস্যা | সমাধান |
|---|---|
| Login হচ্ছে না | Firebase Authentication এ user আছে কিনা দেখো |
| Products দেখাচ্ছে না | Firestore rules check করো |
| ছবি upload হচ্ছে না | Storage rules check করো |
| Config error | `firebase-config.js` এ সঠিক values আছে কিনা দেখো |

---

*আরো সাহায্য লাগলে জানাও!* 😊
