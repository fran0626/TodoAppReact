import{ReactComponent as CheckIcon} from '../assets/check.svg';
import{ReactComponent as DeleteIcon} from '../assets/delete.svg';
import './TodoIcon.css'

const iconTypes = {
    "check": (color) => <CheckIcon className='Icon-svg' fill={color}/>,
    "delete": (color) => <DeleteIcon className='Icon-svg' fill={color}/>
}

function TodoIcon(props) {
    return (
        <span
            className={`Icon-container Icon-container-${props.type}`}
            onClick={props.onClick}
        >
            {iconTypes[props.type](props.color)}
        </span>
    )
}

export {TodoIcon};