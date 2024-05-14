import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import UseFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'

export default function ColumnChart() {
    const { data: bookings } = UseFetch(`${BASE_URL}/booking`);

    const revenueByMonth = new Map();

    bookings.forEach(booking => {
        const { bookAt, tourPrice, guestSize } = booking;

        // Chuyển đổi chuỗi ngày bookAt thành đối tượng Date
        const bookingDate = new Date(bookAt);

        if (
            bookingDate.getMonth() === 4 || // Tháng 5 (lưu ý: tháng được đếm từ 0)
            bookingDate.getMonth() === 3 || // Tháng 4
            bookingDate.getMonth() === 2    // Tháng 3
        ) {

            const month = bookingDate.getMonth() + 1; // Lấy tháng từ 1 đến 12

            // Tạo khóa cho đối tượng Map
            const key = `Tháng ${month}`;

            if (revenueByMonth.has(key)) {
                revenueByMonth.set(key, revenueByMonth.get(key) + tourPrice * guestSize + 10);
            } else {
                revenueByMonth.set(key, tourPrice * guestSize + 10);
            }
        }
    });

    return (
        <>
            <h5>Doanh thu 3 tháng gần nhất</h5>
            <br/>
            <br/>
            <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
                <strong className="text-gray-700 font-medium">Thống kê</strong>
                <div className="mt-3 w-full flex-1 text-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={400}
                            data={Array.from(revenueByMonth, ([key, value]) => ({ key, "Doanh thu": value }))}
                            margin={{
                                top: 20,
                                right: 10,
                                left: -10,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
                            <XAxis dataKey="key" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Doanh thu" fill="#F6C23E" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );
}