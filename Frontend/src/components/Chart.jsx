import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import socket from '../utils/socket';

const Chart = ({ dashboardId, chartId }) => {
    const [data, setData] = useState([
    { name: 'Jan', value: 100 },
    { name: 'Feb', value: 120 },
    { name: 'Mar', value: 90 },
    ]);

    useEffect(() => {
        socket.emit('join-dashboard', dashboardId);

        socket.on('receive-chart-update', ({ chartId: incomingId, newData }) => {
            if (incomingId === chartId) {
            setData(newData);
            }
        });

        return () => {
            socket.off('receive-chart-update');
        };
    }, [dashboardId, chartId]);

    const simulateUpdate = () => {
    const newData = data.map((d) => ({
        ...d,
        value: d.value + Math.round(Math.random() * 20 - 10),
    }));

    setData(newData);
    socket.emit('chart-update', { dashboardId, chartId, newData });
    };

    return (
        <div className="p-4 rounded-xl border shadow w-full max-w-xl">
            <h3 className="font-semibold mb-2">Live Line Chart</h3>
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
            </LineChart>
            </ResponsiveContainer>
            <button onClick={simulateUpdate} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">
            Simulate Update
            </button>
        </div>
    );
}

export default Chart;