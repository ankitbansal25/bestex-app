import Profile from './Profile'
import { MockUser } from '../../mock/data'
import './Heading.css'

export default function Heading() {
    return (
        <div className="HeadingContainer">
            <h3 className="Heading">Fx Trading</h3>
            <Profile user={MockUser} />
        </div>
    )
}
