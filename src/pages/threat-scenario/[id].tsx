import * as React from 'react';
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import Error from 'next/error'
import * as _get from 'lodash'

//@todo namespace these so we don't need to do directory traversal
import ThreatScenarioForm from '../../components/threat-scenario-form'
import { ThreatScenario as IThreatScenario } from '../../Interfaces/Interfaces'
import { get, update } from '../../services/threat-scenario-service'
import { withAuthenticator } from '@aws-amplify/ui-react'

const ThreatScenarioIndex = () => {
    const { query: { id } } = useRouter()
    const [data, setData] = useState(null)
    const [error, setError] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (id) {// id router prop null on first render cycle
            get(id)
                .then(data => {
                    setData(data)
                    setLoading(false)
                })
                .catch(e => setError(_get(e, 'response.status', 500)))
                .finally(() => setLoading(false))
        }
    }, [id])

    if (!data) return <Spin />
    if (error) return <Error statusCode={error} />

    const handleSubmit = async (values: IThreatScenario) => {
        setLoading(true)
        try {
            await update(id, values)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

    return (
        <Spin spinning={loading}>
            <ThreatScenarioForm threatScenario={data} handleSubmit={handleSubmit} buttonText='Update' />
        </Spin>
    )
}

export default withAuthenticator(ThreatScenarioIndex)