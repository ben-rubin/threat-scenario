import React, { useEffect } from 'react'
import Link from 'next/link'
import { Popconfirm, Table } from 'antd'
import { ThreatScenario } from '../interfaces/Interfaces'

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
    // const f = $fetchIndex()
    // props.dispatch(fetchIndexRequest())

    // useEffect(() => {
        // index().then(data => console.log(data)
            // props.dispatch(fetchindexsuccess({
            //     data,
            //     meta: {
            //         page: 1 /*+ result.start / result.limit*/,
            //         pageSize: 10/*result.limit*/,
            //         pageTotal: 10/*Math.ceil(result.total / result.limit)*/,
            //         total: 10000/*result.total*/,
            //     },
            // })),
        // )
    // })
    // props.dispatch($fetchIndex())

    // PAGINATION OPTIONS
    const paginationOptions = {
        showSizeChanger: true,
        showQuickJumper: true,
        onShowSizeChange: (_, pageSize) => {
            // props.dispatch(fetchIndexRequest())
            // index().then(data => console.log(data)
                // props.dispatch(fetchIndexSuccess({
                //     data,
                //     meta: {
                //         page: 1 /*+ result.start / result.limit*/,
                //         pageSize: 10/*result.limit*/,
                //         pageTotal: 10/*Math.ceil(result.total / result.limit)*/,
                //         total: 10000/*result.total*/,
                //     },
                // })),
            // )
            // props.dispatch($pageSize(pageSize))
            // props.dispatch($fetchIndex())
        },
        onChange: (page) => {
            // props.dispatch($page(page))
            // props.dispatch(fetchIndexRequest())
            // index().then(data =>
            //     console.log(data)
                // props.dispatch(fetchIndexSuccess({
                //     data,
                //     meta: {
                //         page: 1 /*+ result.start / result.limit*/,
                //         pageSize: 10/*result.limit*/,
                //         pageTotal: 10/*Math.ceil(result.total / result.limit)*/,
                //         total: 10000/*result.total*/,
                //     },
                // })),
            // )
            // props.dispatch($fetchIndex())
        },
        // pageSizeOptions: props.meta.pageSizeOptions,
        // total: props.meta.total,
        // showTotal: (total, range) => `${range[0]} to ${range[1]} of ${total}`,
    }
    const pagination = {
        // ...paginationOptions,
        // total: props.meta.total,
        // current: props.meta.page,
        // pageSize: props.meta.pageSize,
    }

    return (
        <Table
            size={'middle'}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={data}
            columns={columns}
            rowKey='id'
            pagination={pagination}
        />
    )
}

export default ThreatScenarioTable
