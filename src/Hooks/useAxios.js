import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(url);
                setData(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error)
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useAxios;
