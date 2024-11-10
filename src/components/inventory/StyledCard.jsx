import styled from "styled-components";

export const StyledCard = styled.div`
    width: 250px;
    background: linear-gradient(90deg, rgba(27,41,67,0.85) 0%, rgba(27,41,67,0.3) 100%);

    .top-info {
        display: flex;
        justify-content: space-between;
        padding: 5px 10px;

        .add-infos {
            position: relative;
            img:hover {
                .toggle-hidden {
                    visibility: visible;
                }
            }
            p {
            position: absolute;
            top: -40px;
            font-size: 8px;
            visibility: hidden;
            }
        }
        img {
            width: 16px;
        }
 
    }

    h4 {
        text-align: center;
        font-family: 'lol';
        font-weight: 600;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        word-wrap: normal;
    }

    .title {
        text-align: center;
        font-family: 'lol';
        font-weight: 300;
        font-size: 12px;
        margin: 5px 0 15px;
    }
    .splash-wrapper {
        height: 350px;
        width: 200px;
        background-image: url(${props => props.splashurl});
        background-size: 100% 100%;
        margin: 0 auto;
        box-shadow: inset 0 0 0 1px #F88A03;
        display: flex;
        align-items: flex-end;
        justify-content: space-between;

        .date {
            padding: 10px;
            p {
                font-family: 'lol';
                font-weight: 400;
                font-size: 12px;
                color: #ffffff9a;
            }
        }

        .quantity {
            padding: 10px;
            display: flex;
            align-items: flex-end;

            .img-cards {
                width: 20px;
                margin-right: 5px;
            }
            p{
                font-family: 'lol';
                font-weight: 500;
                font-size: 12px;
            }
        }
    }

    .infos {
        display: flex;
        margin: 8px 25px 0;
        padding-bottom: 25px;
        justify-content: space-between;

        .rarity, .cost {
            display: flex;
            gap: 5px;
            align-items: flex-start;
            p {
                font-size: 12px;
                font-family: 'Roboto';
                font-weight: 600;
                padding-top: 3px;
            }
        }
        .rarity img {
            width: 18px;
        }
        .cost img {
            width: 16px;
        }
    }
`;
