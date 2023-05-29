import { databases } from '../../../appwrite'
export default async function handler(req, res) {

    //doesnt requre authentication for this
    const promise = await databases.listDocuments('6468f10e6e9b67980c51', "646c2809265ac09c5196");

    const userEmail = req.query.email
    if (promise) {
        // match data email with user email
        var docs = promise.documents
        var user = docs.filter(function (user) {
            return user.email === userEmail
        }
        )
        if (user) {
           
            if(req.method ==='GET'){
                let social=user[0].social
                social=JSON.parse(social)
                
                return res.send({social:social,profession:user[0].profession})
            
            }
            if (req.method === 'POST') {
                 let current_userid=user[0].$id;
                const requestBody=req.body;

               
                const promise = databases.getDocument('6468f10e6e9b67980c51', "646c2809265ac09c5196",current_userid );
                promise.then(function (response) {
                let updatedObj={...response,...requestBody};
                console.log(updatedObj)
                delete updatedObj['$collectionId'];
                  delete updatedObj['$databaseId'];
                const promise = databases.updateDocument('6468f10e6e9b67980c51', "646c2809265ac09c5196",current_userid,updatedObj );

                 
                promise.then(function (response) {
    return res.send(response); // Success
}, function (error) {
     return res.status(400).json({msg:error});  // Failure
});

//    Success
}
, function (error) {
    return res.status(400).json({msg:"err"}); // Failure
});
            }
        }
        else {
            return res.status(404).json({ error: "User not found" })
        }
    }

}
