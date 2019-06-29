import * as React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface IProps {

}
interface IStates {

}

export default class PortalHome extends React.Component<IProps, IStates>{
    constructor(props: IProps){
        super(props);
    }

    render() {
        return (
            <div className='fill-page'>
                <div className='mod-header'>
                    
                </div>
            </div>
        )
    }
}