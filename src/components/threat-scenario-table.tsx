import React, { useEffect } from 'react'
import Link from 'next/link'
import { Popconfirm, Table } from 'antd'
import { ThreatScenario } from '../Interfaces/Interfaces'

interface ThreatScenarioTableProps {
    handleDelete
    data: ThreatScenario[]
}

const ThreatScenarioTable = (props: ThreatScenarioTableProps) => {
    const { handleDelete, data } = props

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            render: (value: string, record: ThreatScenario) =>
                <Link href='/threat-scenario/[id]' as={`/threat-scenario/${record.id}`}>
                    <a>{record.title}</a>
                </Link>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Related asset',
            dataIndex: 'related_asset',
        },
        {
            title: 'Classification',
            dataIndex: 'classification_name',
        },
        {
            title: 'Impact',
            dataIndex: 'impact',
        },
        {
            title: 'Likelihood',
            dataIndex: 'likelihood',
        },
        {
            title: 'Risk level',
            dataIndex: 'risk_level',
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (text, record) =>
                <Popconfirm title='Sure to delete?' onConfirm={() => handleDelete(record.id)}>
                    <a>Delete</a>
                </Popconfirm>,
        },
    ]

    return (
        <Table
            size={'middle'}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={data}
            columns={columns}
            rowKey='id'
        />
    )
}

export default ThreatScenarioTable
