import styled from "styled-components";

export const StyledHome = styled.div`

    h1 {
        margin: 25px 0 10px;
        font-family: "lol";
        font-weight: 800;
        text-align: center;
    }
    .intro {
        text-align: center;
        font-family: 'lol';
        margin-bottom: 25px;
    }
    .sorting {
        margin: 15px 58px;

        display: flex;

        label {
            font-family: 'lol';
            font-weight: 400;
            margin-right: 5px;
        }

        select {
            padding: 5px 10px;
            border: 1px solid #0A323C;
            background-color: #010A13;
            color: white;
        }
        .order {
            label {
                margin-left: 15px
            }
        }
    }

    .btn-container {
        text-align: center;
        margin: 15px 0;
        .loadmore {
            padding: 8px 20px;
            background: none;
            border: 1px solid #C89B3C;
            color: white;
            cursor: pointer;
        }
    }
    

`