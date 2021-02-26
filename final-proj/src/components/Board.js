import { useQuery } from 'react-query';
import axios from 'axios';

const Board = (props) => {
    const fetchThreads = async () => {
        return axios.get(`/api/board/${props.match.params.board}`);
    };

    const { data, status } = useQuery('board', fetchThreads);
    console.log(data);
    console.log(status);

    return <div>This is the board</div>;
};

export default Board;
