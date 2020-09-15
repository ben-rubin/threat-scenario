import Link from 'next/link'
import { Button, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react'
import Error from 'next/error'
// import useSwr from 'swr'
import ThreatScenarioTable from '../components/threat-scenario-table'
import { index, remove } from '../services/threat-scenario-service'
import { ThreatScenario } from '../Interfaces/Interfaces'

const Index = (): JSX.Element => {
    // const { data, error } = useSwr(url, fetcher, { })
    const [data, setData] = useState<ThreatScenario[]>([])
    const [error, setError] = useState<number>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        index()
            .then((res: ThreatScenario[]) => setData(res))
            .catch(error => {
                console.error(error)
                setError(500)
            })
            .finally(() => setLoading(false))
    }, [])

    if (error) return <Error statusCode={error} />

    const handleDelete = async (id) => {
        setLoading(true)
        await remove(id)
        setData(await index())
        setLoading(false)
    }

    return (
        <>
            <Spin spinning={loading}>
                <ThreatScenarioTable handleDelete={handleDelete} data={data} />
                <Link href={'/threat-scenario/'} as={'/threat-scenario'}>
                    <Button type='default'>Create new threat scenario</Button>
                </Link>
                <AmplifySignOut />
            </Spin>
        </>
    )
}

export default withAuthenticator(Index)
