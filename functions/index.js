const notEnoughSpaceMessage = "We don't have enough space for your file. You can get more storage space from our store, or try uploading on Google Drive or Youtube and linking them here."

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { UserDimensions } = require("firebase-functions/lib/providers/analytics");
// const cors = require('cors');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp();


const serverVariables = {
    initialByteAllowance : 1000000000
}






async function allowFileUpload(user, fileName, fileSize){
    functions.logger.info('userRequestingToUpload', user)
    claims = user.customClaims ? user.customClaims : {};
    functions.logger.info('found claims', claims)
    claims.nextUpload = fileName;
    claims.nextUploadSize = fileSize;
    functions.logger.info('altered claims', claims)
    await admin.auth().setCustomUserClaims(user.uid, claims)
}

async function checkStorageAllowance(uid, fileName, fileSize){
    let user = await admin.auth().getUser(uid);

    if (fileSize < user.customClaims.BytesAvailable){
        return allowFileUpload(uid, fileName, fileSize).then(() =>{
            return{result: (fileName + " is allowed for upload: " + fileSize)}
        })



    } else {return {error: notEnoughSpaceMessage}}
}

exports.affirmUpload = functions.https.onRequest((request, response) => {

  functions.logger.info("Upload Being Affirmed", request);
  let {uid, fileName, fileSize} = request.query;
  let res = checkStorageAllowance(uid, fileName, fileSize)
//   cors()(request, response, () => {
    response.json(res)
//   });
  
});



exports.onUserSignUp = functions.auth.user()
    .onCreate((user) => {
        let uid = user.uid
        let bytes = serverVariables.initialByteAllowance;

        functions.logger.info('new user created', user)
        claims = user.customClaims ? user.customClaims : {};
        functions.logger.info('found claims', claims)
        claims.BytesAvailable = bytes
        functions.logger.info('altered claims', claims)



        admin.auth().setCustomUserClaims(user.uid, claims)
        .then(() => {
            admin.auth().getUser(uid).then((newUser) => {
                functions.logger.info("new user's customclaims applied", newUser.customClaims);
                return "done"
            })
        })
    })
    

exports.logUserInfo = functions.https.onRequest((req, res) => {
    let uid = req.query.uid
    functions.logger.info('user with this uid', uid);

    admin.auth().getUser(uid)
        .then((user) =>     {
            functions.logger.info(user)
            res.send(user)
        })
})
