import React from 'react'
import App from 'next/app'
import '../styles/antd.less'
import { Provider } from 'react-redux'
import { Amplify, Auth } from 'aws-amplify'
import awsconfig from '../aws-exports'
import { threatScenarioApiUrl } from '../services/threat-scenario-service'
import setBearerToken from '../util/set-bearer-token'
import { initStore } from '../store'
const store = initStore()

Amplify.configure(awsconfig)

class ThreatScenarioApp extends App {
    async componentDidMount() {
        const token = (await Auth.currentSession()).getAccessToken().getJwtToken()
        setBearerToken(threatScenarioApiUrl, token)
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}

export default ThreatScenarioApp