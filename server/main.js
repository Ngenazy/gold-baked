import { Meteor }     from 'meteor/meteor';
import { Accounts }   from 'meteor/accounts-base';
import SimpleSchema   from 'simpl-schema';

//import APIs
import '../imports/api/xbuxAPI';
import '../imports/api/orders';
import '../imports/startup/simple-schema-config.js';

// Server start-up code block
Meteor.startup(() => {


});

Accounts.onCreateUser((options, user) => {
  /*////////////////////////////////////////////////////////////////////////////
  The options argument is being used for now, the options argument  comes
  Account.createUser() (client).Since options may come from untrusted client
  make sure you validate it before creating a user document
  ////////////////////////////////////////////////////////////////////////////*/

  //validte username to be at least 4 and at most  10 characters long
  const userName = options.username;

  new SimpleSchema({
    //userName validation schema
    userName:{
              type: String,
              min:  4,
              max:  10
            }
  }).validate({ userName })

  //assign new properties
  const customizedUser = Object.assign(
    // 1 object to assign to user object in 2.
    {
      // 1.1 user details
      userDetails:{
                    userName:userName,
                    userStatus:"userWithoutWalletDetails"
                  }
    },
    // 2. user object to customize
    user
  );

  //return user object
  return customizedUser;

    })
