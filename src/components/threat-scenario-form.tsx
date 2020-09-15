import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { ThreatScenario } from '../Interfaces/Interfaces'

interface ThreatScenarioFormProps {
    threatScenario?: ThreatScenario
    handleSubmit
    buttonText?: string
}

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
}
const tailLayout = {
    wrapperCol: { offset: 4 },
}

const ThreatScenarioForm = (props?: ThreatScenarioFormProps) => {
    const {
        handleSubmit,
        buttonText = 'Submit',
        threatScenario: {
            title = null,
            description = null,
            related_asset: relatedAsset = null,
            classification_id: classificationId = 1,
            impact = 0,
            likelihood = 0,
            risk_level: riskLevel = 0,
        } = {},
    } = props || {}

    const [form] = Form.useForm()

    const calculateRisk = () => {
        const { impact: i, likelihood: l } = form.getFieldsValue()
        form.setFieldsValue({
            // eslint-disable-next-line @typescript-eslint/camelcase
            risk_level: (i + l) / 2,
        })
    }

    return (
        <>
            <Form
                {...layout}
                form={form}
                layout='horizontal'
                size='middle'
                onFinish={handleSubmit}
            >
                <Form.Item required={true} initialValue={title} name='title' label="Title">
                    <Input required={true} />
                </Form.Item>
                <Form.Item initialValue={description} name='description' label="Description">
                    <Input />
                </Form.Item>
                <Form.Item initialValue={relatedAsset} name='related_asset' label="Related asset">
                    <Input />
                </Form.Item>
                <Form.Item required={true} initialValue={classificationId} name='classification_id'
                           label="Threat scenario classification">
                    {/*@todo api endpoint for retrieving these*/}
                    <Select options={[
                        { value: 1, label: 'spoofing' },
                        { value: 2, label: 'tampering' },
                        { value: 3, label: 'repudiation' },
                        { value: 4, label: 'information_disclosure' },
                        { value: 5, label: 'denial_of_service' },
                        { value: 6, label: 'elevation_of_privilege' },
                    ]} />
                </Form.Item>
                <Form.Item required={true} initialValue={impact} name='impact' label="Impact">
                    <Select onChange={calculateRisk} options={
                        [
                            { value: 0 },
                            { value: 1 },
                            { value: 2 },
                            { value: 3 },
                        ]} />
                </Form.Item>
                <Form.Item required={true} initialValue={likelihood} name='likelihood' label="Likelihood">
                    <Select onChange={calculateRisk} options={[
                        { value: 0 },
                        { value: 1 },
                        { value: 2 },
                        { value: 3 },
                    ]} />
                </Form.Item>
                <Form.Item initialValue={riskLevel} name='risk_level' label="Risk level">
                    <Input readOnly={true} />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">{buttonText}</Button>
                </Form.Item>
            </Form>
        </>
    )
}

export default ThreatScenarioForm