export interface ThreatScenario {
    id: number
    title: string
    description: string | null
    related_asset: string | null
    classification_id: number
    impact: number
    likelihood: number
    risk_level?: number
}
