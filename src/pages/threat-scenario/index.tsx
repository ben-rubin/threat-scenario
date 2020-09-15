import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import Error from 'next/error'
import get from 'lodash/get'

import ThreatScenarioForm from '../../components/threat-scenario-form'
import { ThreatScenario as IThreatScenario } from '../../Interfaces/Interfaces'
import { create } from '../../services/threat-scenario-service'
import { withAuthenticator } from '@aws-amplify/ui-react'

const ThreatScenario = () => {
    const { query: { id } } = useRouter()
    const [error, setError] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(false)

    if (error) return <Error statusCode={error} />

    const handleSubmit = async (values: IThreatScenario) => {
        setLoading(true)
        try {
            await create(values)
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }
    // const { data, error } = useSwr(`/api/threat-scenario/${id}`, fetcher)

    return (
        <Spin spinning={loading}>
            <ThreatScenarioForm handleSubmit={handleSubmit} />
        </Spin>
    )
}

export default withAuthenticator(ThreatScenario)
