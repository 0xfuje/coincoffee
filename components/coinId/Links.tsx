import React from 'react'
import styled from 'styled-components'
import Link from '../Link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHouse, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faFacebook, faTelegram, faReddit, faTwitter } from '@fortawesome/free-brands-svg-icons'

interface LinksProps {
    homepage: string,
    forum: string,
    explorer: string,
    twitter: string,
    facebook: string,
    reddit: string,
    telegram: string,
    github: string
}

function Links({homepage, forum, explorer, twitter, facebook, reddit, telegram, github}: LinksProps) {
    const socialLinks = 
    <>
        <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faTwitter}/>Twitter</Link>
        <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faReddit}/>Reddit</Link>
        <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faTelegram}/>Telegram</Link>
        <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faFacebook}/>Facebook</Link>
    </>

    return (
        <StyledLinks className='Links'>
            <Link href={homepage} size={'big'}><FontAwesomeIcon icon={faHouse}/>Homepage</Link>
            <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faUsers}/>Forum</Link>
            <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faUsers}/>Socials</Link>
            <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faGithub}/>Github</Link>
        </StyledLinks>
    )
}

const StyledLinks = styled.div`
    width: ${props => props.theme.breakpoint.theta};
    margin-bottom: ${props => props.theme.space.epsilon};
    display: flex;
    
    gap: ${props => props.theme.space.eta};
`

export default Links