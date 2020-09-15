##Overview
Toolchain will be
- Docker
- AWS cognito
- Next/Express
- Redux/SWR
- Jest
- eslint

##Getting Started
https://nextjs.org/learn/basics/create-nextjs-app/setup  

##Front End
- Redux & React Context for data layer  
> https://github.com/vercel/next.js/tree/canary/examples/with-redux
> redux-toolkit.js.org @reduxjs/toolkit
- SWR  
>SWR helps with caching and pagination  
>
https://www.leighhalliday.com/how-does-swr-work  
https://www.smashingmagazine.com/2020/06/introduction-swr-react-hooks-remote-data-fetching/  
Going with SWR (new to me but looks good)  
>
- Axios  
> Makes things a little easier. There's a good argument for Axios instead of fetch here https://blog.logrocket.com/axios-or-fetch-api/   
> Timeouts, interceptors, automatic JSON parsing, progress bar are all easier  
>

> @TODO Build service for PUT/POST/DELETE/GET  
>
- antd 
> Its adoption is massive, and I'm familiar with it

##Backend
####Authentication
AWS cognito seems easiest as I'm more familiar with AWS that with any other provider  
>REMEMBER US-WEST2 Region
>
https://www.reddit.com/r/aws/comments/dbdk8y/quickstart_web_app_with_reactjs_amazon_cognito/  
https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html  
https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-with-identity-providers.html  
> @todo is the logout endpoint correct?
>
https://docs.aws.amazon.com/cognito/latest/developerguide/logout-endpoint.html 
https://serverless-stack.com/chapters/test-the-apis.html  
https://blog.logrocket.com/authentication-react-apps-aws-amplify-cognito/  
>Setting up Google OAuth
>
https://developers.google.com/identity/protocols/oauth2/web-server#creatingcred  
>? Do we not need to/want to enable implicit grant OAuth flow? Seems not.
>

>Configure aws cognito auth  
1. `npm install -g @aws-amplify/cli`
2. `amplify configure`
3. `amplify init`
4. `amplify add auth`
5. `amplify push`


####Middleware
- Sanitize incoming/outgoing data https://www.npmjs.com/search?q=sanitize  
####Routing
- Next  
- Express  

####Data transformation

####Events
- Fire events from the router(s) instead of passing directly to handler

####Database
- PostgreSQL (do we need table inheritance?) or MySQL  
> @TODO design schema
>

####Dev Environment
>@TODO Docker-ize everything
>

####Style
- No semicolons. This article convinced me, and it's pleasing to the eye
> https://medium.com/@eugenkiss/dont-use-semicolons-in-typescript-474ccfe4bdb3
>