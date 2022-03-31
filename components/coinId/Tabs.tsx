import React, {useState} from 'react'
import styled from 'styled-components'
import { globalPagePadding } from '../../styles/GlobalStyle'

type ActiveTab = 'chart' | 'markets' | 'stats' | 'description';

interface TabsProps  {
    components: {
        Stats: JSX.Element;
        Markets: JSX.Element;
        Description: JSX.Element;
        Perfomance: JSX.Element;
        Chart: JSX.Element;
    }
}

function Tabs({components}: TabsProps) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('chart')
    return (
        <StyledTabs className='Tabs'>
            <div className="Tabs-settings">
                    <ul className="Tabs-settings-list">
                        <li className='Tabs-settings-list-item'>
                            <button
                                className={`Tabs-settings-chart Tabs-settings-list-item-button
                                Tabs-settings-${activeTab === 'chart' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('chart')}
                            >
                                Chart
                            </button>
                        </li>
                        <li className='Tabs-settings-list-item'>
                            <button
                                className={`Tabs-settings-markets Tabs-settings-list-item-button
                                Tabs-settings-${activeTab === 'markets' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('markets')}
                            >
                                Markets
                            </button>
                        </li>
                        <li className='Tabs-settings-list-item'>
                            <button
                                className={`Tabs-settings-stats Tabs-settings-list-item-button
                                Tabs-settings-${activeTab === 'stats' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('stats')}
                            >
                                Stats
                            </button>
                        </li>
                        <li className='Tabs-settings-list-item'>
                            <button
                                className={`Tabs-settings-description Tabs-settings-list-item-button
                                Tabs-settings-${activeTab === 'description' ? 'active' : 'inactive'}`}
                                onClick={() => setActiveTab('description')}
                            >
                                Description
                            </button>
                        </li>
                    </ul>
                </div>
                <div className="Tabs-components">
                    <div
                        className={`Tabs-components-chart
                        Tabs-components-${activeTab === 'chart' ? 'active' : 'inactive'}`}
                    >
                        {components.Chart}
                    </div>
                    <div
                        className={`Tabs-components-markets
                        Tabs-components-${activeTab === 'markets' ? 'active' : 'inactive'}`}
                    >
                        {components.Markets}
                    </div>
                    <div
                        className={`Tabs-components-stats
                        Tabs-components-${activeTab === 'stats' ? 'active' : 'inactive'}`}
                    >
                        {components.Perfomance}
                        <br/>
                        {components.Stats}
                    </div>
                    <div
                        className={`Tabs-components-description
                        Tabs-components-${activeTab === 'description' ? 'active' : 'inactive'}`}
                    >
                        {components.Description}
                    </div>
                </div>
        </StyledTabs>
    )
}


const StyledTabs = styled.div`
.Tabs {
    &-settings {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: ${props => props.theme.space.gamma};
        border-bottom: 1px solid ${props => props.theme.color.epsilon};
        &-active {
            font-weight: ${props => props.theme.font.weight.alpha};
            color: ${props => props.theme.color.beta};
            border-bottom: 3px solid ${props => props.theme.color.beta};
        }
        &-inactive {
            border-bottom: 3px solid transparent
        }
        &-list {
            display: flex;
            align-items: center;
            color: ${props => props.theme.color.delta};
            gap: ${props => props.theme.space.epsilon};
            
            &-item {
                &-button {
                    font-size: ${props => props.theme.font.size.gamma};
                    padding: ${props => props.theme.space.theta};
                }
            }
        }
    }
    &-components {
        ${globalPagePadding}
        margin: 0 auto;
        max-width: ${props => props.theme.max_width};
        &-inactive {
                display: none;
        }
    }
    
}
    
`;

export default Tabs;