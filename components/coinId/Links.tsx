import React from 'react'
import styled from 'styled-components'
import Link from '../Link'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHouse, faUsers, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
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
    console.log(homepage, forum, explorer, twitter, facebook, reddit, telegram, github)
    const socialLinks = 
    <div className='Links-social-links'>
        {forum ? <Link href={forum} size={'big'}><FontAwesomeIcon icon={faUsers}/>Forum</Link> : ''}
        {twitter ? <Link href={`https://twitter.com/${twitter}`} size={'big'}><FontAwesomeIcon icon={faTwitter}/>Twitter</Link> : ''}
        {reddit ? <Link href={reddit} size={'big'}><FontAwesomeIcon icon={faReddit}/>Reddit</Link> : ''}
        {telegram ? <Link href={`https://telegram/${telegram}`} size={'big'}><FontAwesomeIcon icon={faTelegram}/>Telegram</Link> : ''}
        {facebook ? <Link href={`https://facebook.com/${facebook}`} size={'big'}><FontAwesomeIcon icon={faFacebook}/>Facebook</Link> : ''}
    </div>

    return (
        <StyledLinks className='Links'>
            <Link href={homepage} size={'big'}><FontAwesomeIcon icon={faHouse}/>Homepage</Link>
            <Link href={explorer} size={'big'}><FontAwesomeIcon icon={faMagnifyingGlass}/>Explorer</Link>
            <div className="Links-social">
                <Link href={`/`} size={'big'}><FontAwesomeIcon icon={faUsers}/>Socials</Link>
                {socialLinks}
            </div>
            {github ? <Link href={github} size={'big'}><FontAwesomeIcon icon={faGithub}/>Github</Link> : ''}
        </StyledLinks>
    )
}

const StyledLinks = styled.div`
    
    display: flex;
    gap: ${props => props.theme.space.eta};
    .Links {
        &-social {
            position: relative;
            &:hover {
                .Links-social-links {
                    display: flex;
                }
            }
            &-links {
                
                display: none;
                display: flex;
                top: 2em;
                left: -0.75em;
                position: absolute;
                gap: ${props => props.theme.space.eta};
                flex-direction: column;
                background-color: ${props => props.theme.color.eta};
                padding: ${props => props.theme.space.epsilon};
                border-radius: ${props => props.theme.space.iota};
                box-shadow: 2px 2px 8px #00000040;
            }
            
        }
        
    }
`

export default Links