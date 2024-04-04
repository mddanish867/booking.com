import React, { useMemo } from 'react';

type Props = {
    selectedPrice?: number;
    onChange: (value?: number) => void;
    data: any[];
};

const PriceFilter = ({ selectedPrice, onChange, data }: Props) => {
    // Extract all available prices from the data
    const allPrices = useMemo(() => {
        return data.map((hotel) => hotel.pricePerNight).sort((a, b) => a - b);
    }, [data]);

    return (
        <div>
            <h4 className="text-md font-semibold mb-2">Max Price</h4>
            <select
                className="p-2 border rounded-md w-full"
                value={selectedPrice}
                onChange={(event) =>
                    onChange(
                        event.target.value ? parseInt(event.target.value) : undefined
                    )
                }
            >
                <option value="">Select Max Price</option>
                {/* Use allPrices to display all available options */}
                {allPrices.map((price, index) => (
                    <option key={index} value={price}>
                        {price}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default PriceFilter;
