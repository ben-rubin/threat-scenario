import Link from 'next/link'
import { Button, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import Error from 'next/error'
// import useSwr from 'swr'
// import mutate from 'swr'

import ThreatScenarioTable from '../components/threat-scenario-table'
import { index } from '../services/threat-scenario-service'

const Index = (): JSX.Element => {
    // const { data, error } = useSwr(url, fetcher, { })
    const [data, setData] = useState(null)
    const [error, setError] = useState<number>(0)

    useEffect(() => {
        index()
            .then(res => setData(res))
            .catch(error => {
                console.error(error)
                setError(500)
            })
    }, [])

    if (error) return <Error statusCode={error} />
    if (!error && !data) return <Spin spinning={!data}>loading...</Spin>

    return (
        <>
            <ThreatScenarioTable data={data} />
            <Link href={'/threat-scenario/'} as={'/threat-scenario'}>
                <Button type='default'>Create new threat scenario</Button>
            </Link>
            <AmplifySignOut />
        </>
    )
}

export default withAuthenticator(Index)
