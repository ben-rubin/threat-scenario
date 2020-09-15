1. npm install

>Configure aws cognito authentication
1. `npm install -g @aws-amplify/cli`
2. `amplify configure`
   1. NOTE - at end of the IAM user setup, from the Success page, you will need the key id and secret access key.
      You'll need to enter these into the appropriate aws cli prompts.
3. `amplify init`
4. `amplify add auth`
   1. Use default configuration for email
   2. Use http://localhost:3000 for development signin url
   3. amplify update auth to change any parameters in the future
5. `amplify push`

when running for first time after cloning, had to delete all aws stuff and reconfigure.
There should be a way to re-init a local configuration that was saved in git
Maybe this? https://aws.amazon.com/blogs/mobile/use-existing-cognito-resources-for-your-amplify-api-storage-and-more/
**** I think this message at end of successful creation has good info
Your project has been successfully initialized and connected to the cloud!

Some next steps:
"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud

Pro tip:
Try "amplify add api" to create a backend API and then "amplify push" to deploy everything
