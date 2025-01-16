import React, { useState } from 'react';
import { StyledCard } from './StyledCard';
import imgCards from '../../assets/img/cards-icon.png';
import imgCostRP from '../../assets/img/riot-points.png';
import imgCostBE from '../../assets/img/be.png';
import imgTop from '../../assets/img/top.png';
import imgJungle from '../../assets/img/jungle.png';
import imgMiddle from '../../assets/img/mid.png';
import imgBottom from '../../assets/img/bot.png';
import imgSupport from '../../assets/img/support.png';
import imgSs from '../../assets/img/ss.png';
import imgLol from '../../assets/img/lol.png';

import imgEpic from '../../assets/img/epic.png';
import imgLegendary from '../../assets/img/legendary.png';
import imgMythic from '../../assets/img/mythic.png';
import imgTranscendant from '../../assets/img/transcendant.png';
import imgUltime from '../../assets/img/ultime.png';
import imgLegacy from '../../assets/img/legacy.png';

import imgBandle_city from '../../assets/img/factions/bandle_city.svg';
import imgBilgewater from '../../assets/img/factions/bilgewater.svg';
import imgDemacia from '../../assets/img/factions/demacia.svg';
import imgFreljord from '../../assets/img/factions/freljord.svg';
import imgIonia from '../../assets/img/factions/ionia.svg';
import imgIxtal from '../../assets/img/factions/ixtal.svg';
import imgNoxus from '../../assets/img/factions/noxus.svg';
import imgPiltover from '../../assets/img/factions/piltover.svg';
import imgShadow_isles from '../../assets/img/factions/shadow_isles.svg';
import imgShurima from '../../assets/img/factions/shurima.svg';
import imgTargon from '../../assets/img/factions/shurima.svg';
import imgVoid from '../../assets/img/factions/void.svg';
import imgZaun from '../../assets/img/factions/zaun.svg';

const Card = ({ data }) => {
    const {
        skin_name,
        champion_name,
        title,
        cost,
        rarity,
        positions,
        roles,
        faction,
        blueEssence,
        release_date,
        loadScreenSplashPath,
        fullSplashPath,
        quantity
    } = data;

    const getPosImage = (positions) => {
        if (!positions) return imgSs; // Icône par défaut si positions est null ou vide
        const positionArray = positions.split(',');

        if (positionArray[0].includes('TOP')) {
            return imgTop;
        } else if (positionArray[0].includes('JUNGLE')) {
            return imgJungle;
        } else if (positionArray[0].includes('MIDDLE')) {
            return imgMiddle;
        } else if (positionArray[0].includes('BOTTOM')) {
            return imgBottom;
        } else if (positionArray[0].includes('SUPPORT')) {
            return imgSupport;
        } else {
            return imgSs; // Icône par défaut
        }
    };

    const getRarityIcon = (rarity) => {
        switch (rarity) {
            case 'Rare':
                return imgLegacy;
            case 'Epic':
                return imgEpic;
            case 'Mythic':
                return imgMythic;
            case 'Legendary':
                return imgLegendary;
            case 'Ultimate':
                return imgUltime;
            case 'Transcendent':
                return imgTranscendant;
            case 'NoRarity':
                return imgLol;
            default:
                return imgLol; // Icône par défaut
        }
    };

    const getCostIcon = (skin_name) => {
        if (skin_name.includes('Original')) {
            return imgCostBE;
        } else {
            return imgCostRP;
        }
    };

    const getRegionIcon = (faction) => {
        switch (faction) {
            case 'bandle-city':
                return imgBandle_city;
            case 'bilgewater':
                return imgBilgewater;
            case 'demacia':
                return imgDemacia;
            case 'freljord':
                return imgFreljord;
            case 'ionia':
                return imgIonia;
            case 'ixtal':
                return imgIxtal;
            case 'mount-targon':
                return imgTargon;
            case 'noxus':
                return imgNoxus;
            case 'piltover':
                return imgPiltover;
            case 'shadow-isles':
                return imgShadow_isles;
            case 'shurima':
                return imgShurima;
            case 'unaffiliated':
                return imgSs;
            case 'void':
                return imgVoid;
            case 'zaun':
                return imgZaun;

            default:
                return imgLol;
        }
    };

    let rolesArray = [];
    try {
        if (roles) {
            rolesArray = JSON.parse(roles);
        }
    } catch (error) {
        console.error('Erreur lors de l’analyse JSON de roles :', error);
    }

    const rolesFormatted = Array.isArray(rolesArray)
        ? rolesArray.map(role => role.replace(/"/g, '')).join(", ")
        : "Aucun rôle disponible";

    const [overlayVisible, setOverlayVisible] = useState(false);
    const handleSplashClick = () => {
        setOverlayVisible(true);
    };
    const handleOverlayClose = () => {
        setOverlayVisible(false);
    };

    return (
        <StyledCard className='card-wrapper' splashurl={loadScreenSplashPath}>
            <div className="top-info">
                <img src={getPosImage(positions)} alt="Top icon" />
                <div className="add-infos">
                    <img src={getRegionIcon(faction)} title={faction} />
                    <p className='toggle-hidden'>{rolesFormatted}</p>
                </div>
            </div>
            <h4>{champion_name} {skin_name}</h4>
            <p className='title'>
                {title ? title.charAt(0).toUpperCase() + title.slice(1) : "Titre non disponible"}
            </p>

            <div className="splash-wrapper" onClick={handleSplashClick}>
                <div className="date">
                    <p>{release_date}</p>
                </div>
                <div className='quantity'>
                    <img src={imgCards} className='img-cards' alt="Card quantity icon" />
                    <p>x{quantity}</p>
                </div>
            </div>
            <div className="infos">
                <div className="rarity">
                    <img src={getRarityIcon(rarity)} alt="Rarity icon" />
                    <p>{skin_name.includes('Original') ? 'Base' : (rarity === 'NoRarity' ? 'No rarity' : rarity)}</p>
                </div>
                <div className="cost">
                    <p>
                        {cost === 69 
                        ? "Unavailable" 
                        : skin_name.includes('Original') 
                        ? blueEssence + ' BE' 
                        : cost + ' RP'}
                    </p>
                    <img src={getCostIcon(skin_name)} alt="Cost RP icon" />
                </div>
            </div>

            {overlayVisible && (
                <div className="overlay" onClick={handleOverlayClose}>
                    <div className="overlay-content">
                        <img src={fullSplashPath} alt="Splash Image" />
                    </div>
                </div>
            )}

        </StyledCard>
    );
};

export default Card;
