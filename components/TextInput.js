import styled from 'styled-components';
import COLORS from '../utils/colors';

const InputRoot = styled.input`
    border: none;
    background-color: rgba(0,0,0,0);
    padding: 5px;
    color: ${COLORS.lightText2};
    :hover{
        background-color: rgba(0,0,0,.1);
    }
`;

const TextInput = ({ value }) => <InputRoot value={value} />;

export default TextInput;
