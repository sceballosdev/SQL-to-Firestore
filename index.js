// The Firebase Admin SDK to access the Firebase Realtime Database.
var admin = require("firebase-admin");

var serviceAccount = require("./service-key.json");

admin.initializeApp({
    serviceAccountId:'firebase-adminsdk-1hta8@angulartest-7067f.iam.gserviceaccount.com',
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://angulartest-7067f.firebaseio.com"
});

const data = require("./data.json");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

data && Object.keys(data).forEach(key => {
    const nestedContent = data['empresa'];

    //console.log(nestedContent + "\n " + key);

    if (typeof nestedContent === "object") {
        Object.keys(nestedContent).forEach(docTitle => {

            //console.log(docTitle + "\n"+nestedContent[docTitle]["token"]);

            var uid = nestedContent[docTitle]["token"];
            var email = nestedContent[docTitle]["correo"];
            var pass = nestedContent[docTitle]["password"];


                if ((uid != null||uid !="") && (email!=null|| email!="")){
                admin.auth().importUsers([{
                    uid: uid,
                    email: email,
                    // Must be provided in a byte buffer.
                    passwordHash: Buffer.from(pass)
                }], {
                    hash: {
                        algorithm: 'BCRYPT'
                    }
                }).then(function(results) {
                    results.errors.forEach(function(indexedError) {
                        console.log(' failed to import',
                            indexedError.error);
                    });
                }).catch(function(error) {
                    console.log('Error importing users:', error);
                });
            }



           /* admin.auth().createCustomToken(uid)
                .then(function(customToken) {
                   console.log("Usuario creado" + customToken);


                })
                .catch(function(error) {
                    console.log("Error creating custom token:", error);
                });*/

            /*admin.firestore()
                .collection("users")
                .doc(docTitle)
                .set(nestedContent[docTitle])
                .then((res) => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });*/
        });
    }
});
